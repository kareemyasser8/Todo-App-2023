import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

  tasksList: Array<string>;
  subscription: Subscription;

  constructor(private taskService: TasksService) {

  }

  ngOnInit(): void {
    this.subscription = this.taskService.getTasksList().subscribe(
      (tasksArray)=>{
          this.tasksList = tasksArray;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
