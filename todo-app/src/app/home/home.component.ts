import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  tasks: any[];
  currentTasks: number = 0;
  subscription: Subscription;
  countTasksCompleted: number = 0;

  constructor(private taskService: TasksService) {

  }

  ngOnInit(): void {
    this.subscription = this.taskService.currentTasksNumbers.subscribe(
      tasksNumbers => {
        this.countTasksCompleted = tasksNumbers.completedTasks
        this.currentTasks = tasksNumbers.currentTasks
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
