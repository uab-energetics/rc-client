import { Injectable } from '@angular/core';

@Injectable()
export class SkinService {

  linkElement;
  currentTheme = 'blue';

  constructor() {
    this.linkElement = document.getElementById('skin');
  }

  setTheme(theme: string){
    this.currentTheme = theme;
    this.linkElement.setAttribute('href', SkinService.buildPath(theme));
    localStorage.theme = theme;
  }

  loadFromLocalStorage(){
    if(localStorage.theme) this.setTheme(localStorage.theme);
  }

  private static buildPath(theme: string){
    if(theme === 'blue') return ''; // blue is default
    return `assets/skins/${theme}.css`;
  }

}
