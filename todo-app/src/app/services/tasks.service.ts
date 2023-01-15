import { DataService } from './data.services';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TasksService extends DataService{

  constructor(http: HttpClient){
    super("http://localhost:3000/tasks",http);
  }

}
