import { Component } from '@angular/core';

@Component({
  selector: 'category-displayer',
  templateUrl: './category-displayer.component.html',
  styleUrls: ['./category-displayer.component.scss']
})
export class CategoryDisplayerComponent {

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

  constructor() {

  }

  getDate() {
    let WrittenDay = this.days[this.date.getDay()];
    let WrittenMonth = this.months[this.date.getMonth()];
    let day = this.date.getDate();

    return WrittenDay + ", " + WrittenMonth + " " + day;
  }

}
