import { Component, OnInit } from '@angular/core';
import {FormService} from "../../shared/services/form/form.service";
import {AppForm} from "../../models/AppForm";
import {EncodingService} from "../../shared/services/encoding.service";
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {buildMockForm} from "../../shared/services/form/mock-form.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-pub-coder',
  templateUrl: './pub-coder.component.html',
  styleUrls: ['./pub-coder.component.css']
})
export class PubCoderComponent implements OnInit {

  form: AppForm;
  encoding: AppExperimentEncoding;

  constructor(
    private formService: FormService,
    private encodingService: EncodingService
  ) { }

  /**
   * Load the encoding from url, and its form
   */
  ngOnInit() {
    this.encodingService.getEncoding(5555)
      .then((encoding: AppExperimentEncoding) => {
          this.encoding = encoding;
          window['mockEncoding'] = encoding;
          this.formService.getForm(encoding.form_id).toPromise()
            .catch( err => buildMockForm())
            .then((form: AppForm) => this.form = form)
        })

  }

  displayFormModel_ThisIsOnlyTemporary = {};
  onFormUpdate($event){
    this.displayFormModel_ThisIsOnlyTemporary = $event;
  }

}
