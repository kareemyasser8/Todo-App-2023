import { Subscription } from 'rxjs';
import { NotFoundError } from './../common/not-found-error';
import { BadRequestError } from './../common/bad-request-error';
import { AppError } from './../common/app-error';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})



export class TasksListComponent implements OnInit, OnDestroy {

  tasks: any[];
  tasksEmpty: boolean = true;
  serviceSubscription: Subscription;
  totalTasksCount = 0;
  checked: boolean = false;

  constructor(private taskService: TasksService) {

  }

  seeIfChecked(task) {
    task.checked = !task.checked
    this.playSound();
    this.totalTasksCount++
    this.serviceSubscription = this.taskService.update(task).subscribe(
      (response) => console.log(response)
    )
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
          if (this.tasks[i].checked == true) this.totalTasksCount++;
        }

        if (response && response.length != 0) {
          this.tasksEmpty = false;
          console.log("this.tasksEmpty = ", this.tasksEmpty);
        }
        console.log("The tasks in the list components now: ", this.tasks);

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
    if (task.checked == true) this.totalTasksCount--;
    this.serviceSubscription = this.taskService.delete(task).subscribe(
      (response) => {
        if (this.tasks.length == 0) {
          this.tasksEmpty = true;
        }
      }
    )
  }

}
