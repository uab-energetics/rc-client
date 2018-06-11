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
    // TODO - validate this form input
    this.onSubmit.next(this.formModel.pmcIDs.replace(' ', '').replace('PMC', '')
      .split(',').filter(id => !!id))
    this.reloadForm()
  }

  reloadForm() {
    this.formModel = {
      pmcIDs: ''
    }
  }

}
