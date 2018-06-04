import {Component, OnDestroy, OnInit} from '@angular/core';
import {PubReposService} from "../../../core/pub-repos/pub-repos.service";
import {ActiveProjectService} from "../../../core/active-project/active-project.service";
import {AppProject} from "../../../core/projects/AppProject";
import {PubRepo} from "../../../core/pub-repos/PubRepo";
import {Publication} from "../../../core/pub-repos/Publication";
import {PageAsideComponent} from "../../shared/page-aside/PageAsideComponent";
import {Subject} from "rxjs/Subject";
import {switchMap, tap} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PapaParseService} from "ngx-papaparse";
import {UploadPreviewComponent} from "./upload-preview/upload-preview.component";
import {NotifyService} from "../../../core/notifications/notify.service";

@Component({
  selector: 'app-pub-repos',
  templateUrl: './pub-repos.component.html',
  styleUrls: ['./pub-repos.component.scss']
})
export class PubReposComponent extends PageAsideComponent implements OnInit, OnDestroy {

  activeRepo$: Subject<PubRepo> = new Subject()
  activeRepo: PubRepo

  repos: PubRepo[] = []
  activeRepoPublications: Publication[] = []

  p: number = 1

  activeModal: any
  fileUploadButton: Element

  constructor(public repoService: PubReposService,
              private csvParse: PapaParseService,
              private notify: NotifyService,
              private modalService: NgbModal, public ps: ActiveProjectService ) {
    super()

    this.activeRepo$.asObservable().pipe(
      tap(R => this.activeRepo = R),
      switchMap<PubRepo, Publication[]>(R => this.repoService.getPublications(12, R.id)) as any,
      tap(pubs => this.activeRepoPublications = pubs)
    ).subscribe()

    this.ps.project$.subscribe((project: AppProject) => this.repoService.requestRepos(project.id))

    this.repoService.repos$.subscribe(R => {
      if(this.repos.length == 0 && R.length > 0) // sets the active repo if none is selected
        this.activeRepo$.next(R[0])
      this.repos = R
    })
  }

  ngOnInit() {
    super.ngOnInit()
    this.fileUploadButton = document.getElementById('fileUploadButton')
  }

  openModal(content) {
    this.activeModal = this.modalService.open(content)
  }

  closeModal() {
    if(!this.activeModal) return
    this.activeModal.close()
  }

  handleNewRepoSubmit(newRepoForm: PubRepo) {
    this.repoService.createRepo(12, newRepoForm)
  }

  handleFileChange(files: File[]) {
    if(files.length === 0) return
    let [file] = files
    this.csvParse.parse(file, {
      complete: (results, file) => {
        let parsed: Publication[] = results.data.map(([ col1, col2, col3 ]) => ({
          title: col1,
          sourceID: col2,
          embedding_url: col3
        }))
        const modalRef = this.modalService.open(UploadPreviewComponent, { size: 'lg' });
        modalRef.componentInstance.data = parsed
        modalRef.componentInstance.onConfirm.subscribe(_ => {
          this.repoService.addPublications('12', this.activeRepo.id, parsed)
            .subscribe(() => {
              modalRef.close()
              this.notify.swal.swal("Upload Successful", "CSV Uploaded Successfully", 'success')
            })
        })
      }
    })
  }

}
