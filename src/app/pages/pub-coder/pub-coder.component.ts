import { Component, OnInit } from '@angular/core';
import {FormService} from "../../shared/services/form/form.service";
import {AppForm} from "../../models/AppForm";
import {EncodingService} from "../../shared/services/encoding.service";
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pub-coder',
  templateUrl: './pub-coder.component.html',
  styleUrls: ['./pub-coder.component.css']
})
export class PubCoderComponent implements OnInit {

  form: AppForm;
  encoding: AppExperimentEncoding;

  loading = 0;

  constructor(
    private formService: FormService,
    private encodingService: EncodingService,
    private route: ActivatedRoute
  ) { }

  /**
   * Load the encoding from url, and its form
   */
  ngOnInit() {
    let encoding_id = +this.route.snapshot.paramMap.get('id');
    console.log(encoding_id);
    this.loading++;
    this.encodingService.getEncoding(encoding_id)
      .finally(() => this.loading--)
      .subscribe((encoding: AppExperimentEncoding) => {
          this.encoding = encoding;
          this.loading++;
          this.formService.getForm(encoding.form_id)
            .finally(() => this.loading--)
            .subscribe( form => this.form = form)
        })
  }

  displayFormModel_ThisIsOnlyTemporary = {};
  onFormUpdate($event){
    this.displayFormModel_ThisIsOnlyTemporary = $event;
  }

}
