import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Publication} from "../../../../core/pub-repos/Publication";

@Component({
  selector: 'app-upload-preview',
  templateUrl: './upload-preview.component.html',
  styleUrls: ['./upload-preview.component.css']
})
export class UploadPreviewComponent implements OnInit {

  @Output()
  onConfirm = new EventEmitter()

  @Input()
  data: Publication[]

  curPage: number = 1

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
