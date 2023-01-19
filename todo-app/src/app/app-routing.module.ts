import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { MyDayTasksListComponent } from './myDay-list/myDay-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'my-day', pathMatch: 'full'},
  {path: 'my-day', component: MyDayTasksListComponent},
  {path: 'favourite-list', component: FavouriteListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
