import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'welcome-message',
  templateUrl: './welcome-message.component.html',
  styleUrls: ['./welcome-message.component.scss']
})

export class WelcomeMessageComponent {
  @Input() isEmpty: boolean
}
