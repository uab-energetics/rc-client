import {Component, Input} from '@angular/core';
import {AppProject} from "../../../models/AppProject";
import {SweetAlertService} from "ng2-sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppPublication} from "../../../models/AppPublication";
import {ProjectService} from "../../../shared/services/project.service";
import {PublicationsService} from "../../../shared/services/publications.service";
import {NotifyService} from "../../../shared/services/notify.service";
import * as PapaParse from 'papaparse';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';



/*
* TODO
* This class is too big, and needs a refactor.
* 1.) Move the table into its own component, along with the pagination
*
* */






@Component({
  selector: 'app-project-publications',
  templateUrl: './project-publications.component.html',
  styleUrls: ['./project-publications.component.css']
})
export class ProjectPublicationsComponent {

  @Input() project: AppProject;

  publications: AppPublication[];

  searchPhrase = "";
  currentPage = 1;
  lastPage = 0;

  selectedPublications: Set<number> = new Set();
  selectedFile: File;

  searchStream = new Subject<string>();
  clickStream = new Subject<number>();

  loading = 0;
  modal;

  constructor(
    private notify: NotifyService,
    private modalService: NgbModal,
    private projectService: ProjectService,
    private publicationService: PublicationsService
  ) { }

  ngOnInit() {
    const searchSource = this.searchStream
      .do(() => this.loading = 1)
      .debounceTime(1000)
      .distinctUntilChanged()
      .map( searchTerm => {
        this.searchPhrase = searchTerm;
        return { search: searchTerm, page: 1 }
      });

    const clickSource = this.clickStream
      .map( page => { return { search: this.searchPhrase, page }});

    const source = searchSource.merge(clickSource)
      .startWith({ search: "", page: 1 })
      .mergeMap(( paginationOptions ) => {
        return this.projectService.getPublications(this.project.id, {
          page: paginationOptions.page,
          search: paginationOptions.search,
          page_size: 15
        })
      });

    source.subscribe( data => {
      this.loading = 0;
      this.currentPage = data.current_page;
      this.lastPage = data.last_page;
      this.publications = data.data;
    });
  }

  handleGotoPage = (page: number) => this.clickStream.next(page);
  onSearchInput = (searchPhrase) => this.searchStream.next(searchPhrase);
  toggleSelection = (id) => this.selectedPublications.add(id);
  isSelected = (id) => this.selectedPublications.has(id);
  handleFileInput = (fileList: FileList) => this.selectedFile = fileList[0];
  openModal = (content) => this.modal = this.modalService.open(content);

  onPublicationFormSubmit(newPublication: AppPublication){
    this.modal.close();
    this.projectService.createPublication(this.project.id, newPublication)
      .subscribe( pub => this.publications.push(pub));
  }

  onDeletePublication(publication){
    this.loading++;
    this.publicationService.deletePublication(publication.id)
      .finally(() => this.loading--)
      .subscribe(() => {
        this.notify.toast('Publication deleted');
        this.publications.filter( pub => pub.id !== publication.id );
      })
  }

  onUploadFile(){
    if(!this.selectedFile)
      return alert('No file selected!');

    PapaParse.parse(this.selectedFile, {
      skipEmptyLines: true,
      complete: (results, file) => {
        console.log("Parsing complete:", results, file);
        if(results.errors.length > 0)
          return alert('Could not parse file. Please check format and try again. (Details in console)');

        this.loading++;
        this.publicationService.uploadFromCSV(this.project.id, results.data)
          .finally(() => this.loading--)
          .subscribe( res => {
            this.notify.toast('CSV Uploaded');
            this.searchStream.next('');
          }, err => {
            this.notify.alert('Error', err.error.details, 'error');
            return []
          });
      }
    });
  }
}
