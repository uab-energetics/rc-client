import { Component } from '@angular/core';
import {SkinService} from "./core/themes/skin.service";
import {ActiveProjectService} from './core/active-project/active-project.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private themeService: SkinService,
    private activeProjectService: ActiveProjectService
  ) {
    themeService.loadFromLocalStorage();
    this.activeProjectService.loadProject();
  }

}
