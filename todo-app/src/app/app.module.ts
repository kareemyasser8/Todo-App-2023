import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryDisplayerComponent } from './category-displayer/category-displayer.component';
import { TaskInputComponent } from './task-input/task-input.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { HomeComponent } from './home/home.component';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CategoryDisplayerComponent,
    TaskInputComponent,
    TasksListComponent,
    HomeComponent,
    WelcomeMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
