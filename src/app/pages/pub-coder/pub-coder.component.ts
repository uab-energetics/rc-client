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
import {AppPublication} from '../../models/AppPublication';
import {PublicationsService} from '../../shared/services/publications.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-pub-coder',
  templateUrl: './pub-coder.component.html',
  styleUrls: ['./pub-coder.component.css']
})
export class PubCoderComponent implements OnInit {

  form: AppForm;
  publication: AppPublication;
  encoding: AppExperimentEncoding;

  loading = 0;
  embeddingURL;

  constructor(
    private formService: FormService,
    private encodingService: EncodingService,
    private publicationService: PublicationsService,
    private route: ActivatedRoute,
    private notify: NotifyService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Load the encoding from url, and its form
   */
  ngOnInit() {
    this.loadEncoding().subscribe((encoding: AppExperimentEncoding) => {
      this.loading += 2;
      this.formService.getForm(encoding.form_id)
        .finally(() => this.loading--)
        .subscribe( form => this.form = form);

      this.publicationService.getPublication(encoding.publication_id)
        .finally(() => this.loading--)
        .subscribe( pub => {
          this.publication = pub;
          this.embeddingURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.publication.embedding_url);
        });
    })
  }

  loadEncoding(){
    let encoding_id = +this.route.snapshot.paramMap.get('id');
    let src = this.encodingService.getEncoding(encoding_id)
      .do(() => this.loading++ )
      .finally(() => this.loading--);
    src.subscribe( encoding => this.encoding = encoding );
    return src;
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

  handleChangeBranch(data: object){
    this.loading++;
    this.encodingService.recordBranch(this.encoding.id, data as AppBranch)
      .finally(() => this.loading--)
      .subscribe(() => this.loadEncoding());
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
      .subscribe(() => {
        this.notify.toast('Data Saved!');
        this.changes = false;
        this.loadEncoding();
      })
  }

  changes = false;
  onChange(){
    this.changes = true;
  }
}
