import { Component, OnInit } from '@angular/core';
import {download} from "../../files/download";

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.scss']
})
export class RenderComponent implements OnInit {

  codebookData: any

  ngOnInit() {
    this.codebookData = JSON.parse(localStorage['render-codebook'])
  }

  startDownload() {
    download('codebook-export.html', document.getElementById('html-rendering').innerHTML)
  }

}
