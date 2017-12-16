import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-structure-panel',
  templateUrl: './form-structure-panel.component.html',
  styleUrls: ['./form-structure-panel.component.css']
})
export class FormStructurePanelComponent implements OnInit {

  @Input() category;

  constructor() { }

  ngOnInit() {
  }

}
