import { Component } from '@angular/core';
import {SkinService} from "./shared/services/skin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private themeService: SkinService) {
    themeService.loadFromLocalStorage();
  }

}
