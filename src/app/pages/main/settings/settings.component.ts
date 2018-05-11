import { Component, OnInit } from '@angular/core';
import {SkinService} from '../../../core/themes/skin.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  theme

  constructor(
    private skin: SkinService
  ) { }

  ngOnInit() {
    this.theme = this.skin.currentTheme;
  }

  setTheme(theme){
    console.log(theme);
    this.skin.setTheme(theme);
  }

}
