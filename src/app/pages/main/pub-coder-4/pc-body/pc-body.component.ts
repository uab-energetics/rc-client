import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormFiller} from "../../../../lib/rc-forms/form-filler/FormFiller";
import {FormEvent} from "../../../../lib/rc-forms/form-filler/events/FormEvent";
import {FormSpec} from "../../../../lib/rc-forms/form-spec/FormSpec";

import CodeBookForm from '../../../../lib/rc-forms/form-spec/demos/metaDataCodebookBuilder'

@Component({
  selector: 'app-pc-body',
  templateUrl: './pc-body.component.html',
  styleUrls: ['./pc-body.component.scss']
})
export class PcBodyComponent implements OnInit {

  @Input() formFiller: FormFiller
  @Output() encodingChange = new EventEmitter<FormEvent>()

  form: FormSpec = CodeBookForm

  ngOnInit() {
  }
}
