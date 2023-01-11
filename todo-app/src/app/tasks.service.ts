import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Array<string> = ["play","study","work"];

  constructor() {}

  getTasksList(): Observable<string[]>  {
    return  new Observable((subscriber)=>{
      subscriber.next(this.tasks)
    })
  }

  add(taskDesciption:string): void{
    this.tasks.push(taskDesciption);
  }

  delete(index:number){
    this.tasks.splice(index,1);
  }


}
