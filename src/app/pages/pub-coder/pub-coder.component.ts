import { Component, OnInit } from '@angular/core';
import {FormService} from "../../shared/services/form.service";
import {AppForm} from "../../models/AppForm";
import {EncodingService} from "../../shared/services/encoding.service";
import {AppExperimentEncoding} from "../../models/AppExperimentEncoding";
import {ActivatedRoute} from "@angular/router";
import * as _ from "lodash";
import {forkJoin} from "rxjs/observable/forkJoin";
import {NotifyService} from "../../shared/services/notify.service";
import {AppBranch} from "../../models/AppBranch";

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
    private route: ActivatedRoute,
    private notify: NotifyService
  ) { }

  /**
   * Load the encoding from url, and its form
   */
  ngOnInit() {
    let encoding_id = +this.route.snapshot.paramMap.get('id');
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

  handleDeleteBranch(id: number){
    this.loading++;
    this.encodingService.deleteBranch(this.encoding.id, id)
      .finally(() => this.loading--)
      .subscribe(() => this.ngOnInit());
  }

  handleCreateBranch(data: object){
    this.loading++;
    this.encodingService.recordBranch(this.encoding.id, data as AppBranch)
      .finally(() => this.loading--)
      .subscribe(() => this.ngOnInit());
  }

  handleSaveResponses(response_array){
    // enqueue the response updates
    let requests = [];
    response_array.forEach( _response => {
      let source = this.encodingService
        .recordResponse(this.encoding.id, _response.branch_id, _response);
      requests.push(source);
    });

    // resolve them all
    this.loading++;
    forkJoin(requests)
      .finally(() => this.loading--)
      .subscribe(() => this.notify.toast('Data Saved!'))
  }

}
