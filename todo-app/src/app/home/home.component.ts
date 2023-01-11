import { Observable, Subscription } from 'rxjs';
import { TasksService } from './../tasks.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  tasksEmpty: boolean = true;
  subscription: Subscription;

  constructor(private taskService: TasksService) {

  }
  ngOnInit(): void {
    this.subscription = this.taskService.getTasksList().subscribe((tasksArray) => {
      if (tasksArray && tasksArray.length != 0)
        this.tasksEmpty = false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
