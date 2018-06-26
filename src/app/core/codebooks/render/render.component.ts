import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.scss']
})
export class RenderComponent implements OnInit {

  codebookData: any

  ngOnInit() {
    this.codebookData = JSON.parse(localStorage['render-codebook'])
    console.log('rendering', this.codebookData)
  }

}
