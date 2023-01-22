import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-options-panel',
  templateUrl: './options-panel.component.html',
  styleUrls: ['./options-panel.component.scss']
})
export class OptionsPanelComponent implements OnInit {

  tasks: any[];
  currentTasks: number = 0;
  subscription: Subscription;
  countTasksCompleted: number = 0;
  countTasksFavorite: number = 0;
  currentFavoriteTasks: number = 0;

  constructor(private taskService: TasksService) {

  }

  ngOnInit(): void {
    this.subscription = this.taskService.currentTasksNumbers.subscribe(
      tasksNumbers => {
        this.countTasksCompleted = tasksNumbers.completedTasks
        this.currentTasks = tasksNumbers.currentTasks
        this.countTasksFavorite = tasksNumbers.favoriteTasks
        this.currentFavoriteTasks = tasksNumbers.currentFavoriteTasks
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
