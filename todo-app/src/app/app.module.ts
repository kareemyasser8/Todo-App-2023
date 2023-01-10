import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryDisplayerComponent } from './category-displayer/category-displayer.component';
import { TaskInputComponent } from './task-input/task-input.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryDisplayerComponent,
    TaskInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
