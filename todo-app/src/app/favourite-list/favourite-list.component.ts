import { Component, OnInit } from '@angular/core';
import { NotFoundError, Subscription } from 'rxjs';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.scss']
})
export class FavouriteListComponent implements OnInit {

  favouriteTasks: any[] = [];
  fullTasksSize: number;
  favouriteTasksEmpty: boolean = true;
  serviceSubscription: Subscription;
  countFavTasksCompleted = 0;
  countTasksCompleted = 0;
  countTasksFavorite = 0;
  checked: boolean = false;
  currentFavoriteTasks: number = 0;
  public currentTasks: number = 0;

  constructor(private taskService: TasksService) {

  }

  seeIfChecked(task) {
    task.checked = !task.checked
    this.playSound();
    this.countFavTasksCompleted++;
    this.currentTasks = this.fullTasksSize - this.countFavTasksCompleted;
    this.currentFavoriteTasks = this.countTasksFavorite - this.countFavTasksCompleted;

    this.updateTasksNumbers()
    this.serviceSubscription = this.taskService.update(task).subscribe(null)
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
        response.reverse();
        response.forEach(element => {
          element.isFavorite == true? this.favouriteTasks.push(element): null
          element.isFavorite == true? this.countTasksFavorite++: null
          element.checked == true && element.isFavorite == true? this.countFavTasksCompleted++ : null
          element.checked == false && element.isFavorite == true? this.currentFavoriteTasks++ : null
          element.checked == true? this.countTasksCompleted++ : null

        });

        if (response && response.length != 0) {
          this.favouriteTasksEmpty = false;
        }

        this.fullTasksSize = response.length

        this.currentTasks = this.fullTasksSize - this.countTasksCompleted;
        this.updateTasksNumbers()
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

  favoriteTask(task){
    let index = this.favouriteTasks.indexOf(task);
    task.isFavorite = !task.isFavorite;
    if(task.isFavorite == false){
      this.favouriteTasks.splice(index,1);
      this.taskService.update(task).subscribe(null);
      this.countTasksFavorite--;
      (task.isFavorite == false && task.checked == true)? this.countFavTasksCompleted-- : null;
      (task.isFavorite == false && task.checked == true)? this.countTasksFavorite-- : null;
      (task.isFavorite == false && task.checked == false)? this.currentFavoriteTasks-- : null;
      this.updateTasksNumbers();
    }
  }

  deleteTask(task){
    let index = this.favouriteTasks.indexOf(task);
    this.favouriteTasks.splice(index,1);
    this.countTasksFavorite--;
    (task.isFavorite == true && task.checked == true)? this.countFavTasksCompleted-- : null;
    (task.isFavorite == true && task.checked == true)? this.countTasksFavorite-- : null;
    (task.isFavorite == true && task.checked == false)? this.currentFavoriteTasks-- : null;
    (task.isFavorite == true && task.checked == false)? this.currentTasks-- : null;

    this.taskService.delete(task).subscribe(null);
    this.updateTasksNumbers();
  }

  createTask(taskDec: HTMLInputElement) {
    if (taskDec.value == "") {
      return
    } else {
      let inputTask = { "description": taskDec.value, "checked": false, "isFavorite": true};
      taskDec.value = "";

      this.currentTasks++;
      this.currentFavoriteTasks++;

      this.updateTasksNumbers()
      this.serviceSubscription = this.taskService.create(inputTask).subscribe(
        (response: any) => {
          if (response && response.length != 0) {
            this.favouriteTasksEmpty = false;
          }
          inputTask["id"] = response.id;
          this.favouriteTasks.splice(0, 0, inputTask);
        },
        (error: AppError) => {
          this.favouriteTasks.splice(0, 1);
          if (error instanceof BadRequestError) {

          } else {
            throw error;
          }
        }
      )
    }
  }


  // deleteTask(task: any) {
  //   let index = this.tasks.indexOf(task);
  //   this.tasks.splice(index, 1);
  //   if (task.checked == true){
  //     this.countTasksCompleted--;
  //   }else{
  //     this.currentTasks--;
  //   }

  //   this.updateTasksNumbers()

  //   this.serviceSubscription = this.taskService.delete(task).subscribe(
  //     (response) => {
  //       if (this.tasks.length == 0) {
  //         this.tasksEmpty = true;
  //       }
  //     }
  //   )
  // }

  updateTasksNumbers(){
    this.taskService.changeCompletedTasks({
      completedTasks: this.countFavTasksCompleted,
      currentTasks: this.currentTasks,
      currentFavoriteTasks: this.currentFavoriteTasks,
      favoriteTasks: this.countTasksFavorite
    })
  }


}
