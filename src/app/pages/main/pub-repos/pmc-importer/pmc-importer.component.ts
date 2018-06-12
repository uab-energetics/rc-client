import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pmc-importer',
  templateUrl: './pmc-importer.component.html',
  styleUrls: ['./pmc-importer.component.css']
})
export class PmcImporterComponent implements OnInit {

  @Input()
  formModel: { pmcIDs: string }

  @Output()
  onSubmit = new EventEmitter<string[]>()

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (!this.formModel)
      this.reloadForm()
  }

  handleSubmit() {
    const ids = this.formModel.pmcIDs.match(/\d+/g)
    this.onSubmit.next(ids)
    this.reloadForm()
  }

  reloadForm() {
    this.formModel = {
      pmcIDs: ''
    }
  }

}
