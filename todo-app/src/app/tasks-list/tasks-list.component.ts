import { Component, OnInit } from '@angular/core';

import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})



export class TasksListComponent implements OnInit {

  tasks: any[];
  tasksEmpty: boolean = true;

  constructor(private taskService: TasksService) {

  }

  ngOnInit(): void {
    this.taskService.getAll()
      .subscribe((response: any) => {
        this.tasks = response.reverse();
        if (response && response.length != 0) {
          this.tasksEmpty = false;
          console.log("this.tasksEmpty = ", this.tasksEmpty);
        }
        console.log("The tasks in the list components now: ", this.tasks);

      }
      )

  }

  createTask(taskDec: HTMLInputElement) {
    let inputTask = { "description": taskDec.value };
    taskDec.value = "";
    this.taskService.create(inputTask).subscribe(
      (response: any) => {
        if (response && response.length != 0) {
          this.tasksEmpty = false;
        }
        inputTask["id"] = response.id;
        this.tasks.splice(0, 0, inputTask);
      }
    )
  }


  deleteTask(task: any) {
    let index = this.tasks.indexOf(task);
    console.log(task);
    this.tasks.splice(index, 1);
    this.taskService.delete(task).subscribe(
      (response) => {
        if (this.tasks.length == 0) {
          this.tasksEmpty = true;
        }
      }
    )
  }

}
