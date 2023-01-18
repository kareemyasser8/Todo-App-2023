import { AppErrorHandler } from './common/app-error-handler';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryDisplayerComponent } from './category-displayer/category-displayer.component';
import { HomeComponent } from './home/home.component';
import { TasksListComponent } from './myDay-list/myDay-list.component';
import { TasksService } from './services/tasks.service';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryDisplayerComponent,
    TasksListComponent,
    HomeComponent,
    WelcomeMessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    TasksService,
    {provide: ErrorHandler, useClass : AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
