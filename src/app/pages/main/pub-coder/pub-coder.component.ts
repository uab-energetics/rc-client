import {Component, OnInit, ViewChild} from '@angular/core';
import {FormService} from "../../../core/forms/form.service";
import {AppForm} from "../../../core/forms/AppForm";
import {EncodingService} from "../../../core/encodings/encoding.service";
import {AppExperimentEncoding} from "../../../core/encodings/AppExperimentEncoding";
import {ActivatedRoute} from "@angular/router";
import * as _ from "lodash";
import {forkJoin} from "rxjs/observable/forkJoin";
import {NotifyService} from "../../../core/notifications/notify.service";
import {AppBranch} from "../../../core/form-branch/AppBranch";
import {AppPublication} from '../../../core/publications/AppPublication';
import {PublicationsService} from '../../../core/publications/publications.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AppEncodingTask} from "../../../core/tasks/AppEncodingTask";
import {TaskService} from "../../../core/tasks/task.service";

@Component({
  selector: 'app-pub-coder',
  templateUrl: './pub-coder.component.html',
  styleUrls: ['./pub-coder.component.css']
})
export class PubCoderComponent implements OnInit {

  form: AppForm;
  publication: AppPublication;
  encoding: AppExperimentEncoding;
  task: AppEncodingTask;
  @ViewChild('experimentForm') experimentForm;

  loading = 0;
  view = 'code';
  embeddingURL;

  constructor(
    private formService: FormService,
    private encodingService: EncodingService,
    private taskService: TaskService,
    private publicationService: PublicationsService,
    private route: ActivatedRoute,
    private notify: NotifyService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Load the encoding from url, and its form
   */
  ngOnInit() {
    let task_id = +this.route.snapshot.paramMap.get('id')
    this.loadTask(task_id).switchMap(task => this.loadEncoding(task.encoding_id))
      .subscribe((encoding: AppExperimentEncoding) => {
        this.loading += 2;
        this.formService.getForm(encoding.form_id)
          .finally(() => this.loading--)
          .subscribe(form => this.form = form);

        this.publicationService.getPublication(encoding.publication_id)
          .finally(() => this.loading--)
          .subscribe(pub => {
            this.publication = pub;
            this.embeddingURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.publication.embedding_url);
          });
      });
    this.setupHotKeys();
  }

  loadTask(task_id: number) {
    this.loading++
    let src = this.taskService.getTask(task_id)
      .finally(() => this.loading--)
    src.subscribe(task => this.task = task)
    return src
  }

  loadEncoding(encoding_id: number){
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
      });
  }

  handleTaskComplete(task: AppEncodingTask) {
    this.taskService.updateCompletion(task.id, task.complete)
      .finally(() => this.loadTask(task.id))
      .subscribe( _ => {})
  }


  saveChanges(){
    this.handleTaskComplete(this.task)
    this.handleSaveResponses(this.experimentForm.exportChangedResponses());
  }

  setupHotKeys(){
    document.addEventListener("keydown", event => {
      if(event.ctrlKey && event.key === "s"){
        event.preventDefault();
        this.saveChanges();
      }
    });
  }

  setComplete(task: AppEncodingTask, value: boolean) {
    task.complete = value
    this.onChange()
  }


  /**
   * STRUCTURE
   *
   */





  changes = false;
  onChange(){
    this.changes = true;
  }
}
