import { DataService } from './data.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TasksService extends DataService{

  private tasksNumbers = new BehaviorSubject<any>(
    {
      completedTasks: 0,
      currentTasks: 0,
      currentFavoriteTasks: 0,
      favoriteTasks: 0
    }
  );

  currentTasksNumbers = this.tasksNumbers.asObservable();

  constructor(http: HttpClient){
    super("http://localhost:3000/tasks",http);
  }

  changeCompletedTasks(taskNumbersObject: object){
    this.tasksNumbers.next(taskNumbersObject);
  }

}
