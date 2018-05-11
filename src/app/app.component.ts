import { Component } from '@angular/core';
import {SkinService} from "./core/themes/skin.service";
import {NotificationsService} from "./core/notifications/notifications.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private themeService: SkinService,
    private notifications: NotificationsService
  ) {
    themeService.loadFromLocalStorage();
  }

}
