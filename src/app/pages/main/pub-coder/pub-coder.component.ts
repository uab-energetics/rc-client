import {Component, OnInit, ViewChild} from '@angular/core';
import {FormService} from "../../../core/forms/form.service";
import {AppForm} from "../../../core/forms/AppForm";
import {EncodingService} from "../../../core/encodings/encoding.service";
import {AppExperimentEncoding} from "../../../core/encodings/AppExperimentEncoding";
import {ActivatedRoute, Router} from "@angular/router";
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
  task_id = null
  @ViewChild('experimentForm') experimentForm;

  loading = 0;
  view = 'code';
  embeddingURL;

  nextTasks: AppEncodingTask[] = null

  constructor(
    private formService: FormService,
    private encodingService: EncodingService,
    private taskService: TaskService,
    private publicationService: PublicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotifyService,
    private sanitizer: DomSanitizer
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  /**
   * Load the encoding from url, and its form
   */
  ngOnInit() {
    this.task_id = +this.route.snapshot.paramMap.get('id')
    const task_id = this.task_id
    this.loadTask(task_id)
      .switchMap(task => {
        if (task.encoding_id === null) {
          return this.startEncoding(task_id)
        }
        return this.loadEncoding(task.encoding_id)
      })
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
    this.findNextTasks()
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

  startEncoding(task_id) {
    let src = this.taskService.startEncoding(task_id)
      .do( () => this.loading++ )
      .finally( () => this.loading-- )
    src.subscribe( encoding => this.encoding = encoding )
    return src
  }

  handleDeleteBranch(id: number){
    this.loading++;
    this.saveChanges()
    this.encodingService.deleteBranch(this.encoding.id, id)
      .finally(() => this.loading--)
      .subscribe(() => this.ngOnInit());
  }

  handleCreateBranch(data: object){
    this.loading++;
    this.saveChanges()
    this.encodingService.recordBranch(this.encoding.id, data as AppBranch)
      .finally(() => this.loading--)
      .subscribe(() => this.ngOnInit());
  }

  handleChangeBranch(data: object){
    this.loading++;
    this.saveChanges()
    this.encodingService.recordBranch(this.encoding.id, data as AppBranch)
      .finally(() => this.loading--)
      .subscribe(() => this.loadEncoding(this.encoding.id));
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
      .finally(() => {
        this.changes = false;
        this.loading--
      })
      .subscribe(() => {
        this.notify.toast('Data Saved!');
        this.changes = false;
        this.loadEncoding(this.encoding.id);
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

  findNextTasks() {
    this.taskService.myNextTasks()
    .subscribe( (tasks: AppEncodingTask[]) => {
      this.nextTasks = tasks.filter(task => task.id != this.task_id)
    }, err => {
      this.nextTasks = []
    })
  }

  nextTask() {
    if (this.nextTasks === null || this.nextTasks.length === 0) {
      return
    }
    let task_id = this.nextTasks[0].id
    console.log("next task: " + task_id)
    this.router.navigate(['pub-coder', task_id])
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
