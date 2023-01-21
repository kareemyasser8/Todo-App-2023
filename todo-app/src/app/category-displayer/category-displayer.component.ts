import { Event, NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'category-displayer',
  templateUrl: './category-displayer.component.html',
  styleUrls: ['./category-displayer.component.scss']
})
export class CategoryDisplayerComponent {

  currentCategory: string;
  date: any = new Date();
  days: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  months: Array<string> =
    ["January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"]

  constructor(private router: Router) {
    router.events.pipe(filter((event:Event) => event instanceof NavigationEnd))
      .subscribe((event:any) => {
        this.setCategoryType(event.url);
      })
  }

  setCategoryType(url:string){
      if(url == "/my-day") this.currentCategory = "My Day";
      if(url == "/favourite-list") this.currentCategory = "Important";

  }

  getDate() {
    let WrittenDay = this.days[this.date.getDay()];
    let WrittenMonth = this.months[this.date.getMonth()];
    let day = this.date.getDate();

    return WrittenDay + ", " + WrittenMonth + " " + day;
  }

}
