import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { TasksService } from '../services/tasks.service';
import { AppError } from './../common/app-error';
import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})


export class TasksListComponent implements OnInit, OnDestroy {

  tasks: any[];
  tasksEmpty: boolean = true;
  serviceSubscription: Subscription;
  countTasksCompleted = 0;
  checked: boolean = false;
  public currentTasks: number;

  constructor(private taskService: TasksService) {

  }

  seeIfChecked(task) {
    task.checked = !task.checked
    this.playSound();
    this.countTasksCompleted++;
    this.currentTasks = this.tasks.length - this.countTasksCompleted;

    this.updateTasksNumbers()
    this.serviceSubscription = this.taskService.update(task).subscribe(null)
  }

  playSound() {
    let audio = new Audio();
    audio.src = "../assets/audio/task-sound.mp3";
    audio.load();
    audio.play();
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.serviceSubscription = this.taskService.getAll()
      .subscribe((response: any[]) => {
        this.tasks = response.reverse();

        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].checked == true) this.countTasksCompleted++;
        }

        if (response && response.length != 0) {
          this.tasksEmpty = false;
        }

        this.currentTasks = this.tasks.length - this.countTasksCompleted;
        this.updateTasksNumbers()
      },
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log("Page not found")
          } else {
            throw error;
          }
        }
      )

  }

  createTask(taskDec: HTMLInputElement) {
    if (taskDec.value == "") {
      return
    } else {
      let inputTask = { "description": taskDec.value, "checked": false };
      taskDec.value = "";
      this.currentTasks = this.tasks.length - this.countTasksCompleted;
      this.currentTasks++;

      this.updateTasksNumbers()
      this.serviceSubscription = this.taskService.create(inputTask).subscribe(
        (response: any) => {
          if (response && response.length != 0) {
            this.tasksEmpty = false;
          }
          inputTask["id"] = response.id;
          this.tasks.splice(0, 0, inputTask);
        },
        (error: AppError) => {
          this.tasks.splice(0, 1);
          if (error instanceof BadRequestError) {

          } else {
            throw error;
          }
        }
      )
    }
  }


  deleteTask(task: any) {
    let index = this.tasks.indexOf(task);
    console.log(task);
    this.tasks.splice(index, 1);
    if (task.checked == true){
      this.countTasksCompleted--;
    }else{
      this.currentTasks--;
    }

    this.updateTasksNumbers()

    this.serviceSubscription = this.taskService.delete(task).subscribe(
      (response) => {
        if (this.tasks.length == 0) {
          this.tasksEmpty = true;
        }
      }
    )
  }

  updateTasksNumbers(){
    this.taskService.changeCompletedTasks({
      completedTasks: this.countTasksCompleted,
      currentTasks: this.currentTasks
    })
  }

}
