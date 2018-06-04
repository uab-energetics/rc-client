import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Publication} from "../../../../core/pub-repos/Publication";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-one',
  templateUrl: './add-one.component.html',
  styleUrls: ['./add-one.component.css']
})
export class AddOneComponent implements OnInit {

  @Input()
  formModel: Publication

  @Output()
  onSave = new EventEmitter<Publication>()

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (!this.formModel)
      this.reloadForm()
  }

  handleSubmit() {
    this.onSave.next({...this.formModel})
    this.reloadForm()
  }

  reloadForm() {
    this.formModel = {
      title: '',
      embeddingURL: ''
    }
  }

}
