import { AppErrorHandler } from './common/app-error-handler';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryDisplayerComponent } from './category-displayer/category-displayer.component';
import { HomeComponent } from './home/home.component';
import { MyDayTasksListComponent } from './myDay-list/myDay-list.component';
import { TasksService } from './services/tasks.service';
import { WelcomeMessageComponent } from './welcome-message/welcome-message.component';
import { OptionsPanelComponent } from './options-panel/options-panel.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryDisplayerComponent,
    MyDayTasksListComponent,
    HomeComponent,
    WelcomeMessageComponent,
    OptionsPanelComponent,
    FavouriteListComponent,
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
