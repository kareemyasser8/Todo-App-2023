import { TasksService } from './../tasks.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {

  constructor(private taskService: TasksService) { }

   addTask(taskDesc: string){
      this.taskService.add(taskDesc);
   }

   log(x){
    console.log(x);
   }

  ngOnInit(): void {
  }

}
