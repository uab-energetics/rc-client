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
import {AddOneComponent} from "./add-one/add-one.component";
import {ArticlesService} from "../../../core/pmc/articles.service";
import {PmcImporterComponent} from "./pmc-importer/pmc-importer.component";
import {PMCResult} from "../../../core/pmc/PMCResult";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-pub-repos',
  templateUrl: './pub-repos.component.html',
  styleUrls: ['./pub-repos.component.scss']
})
export class PubReposComponent implements OnInit {

  /*
  *
  * WARNING - there are some things you will likely run into when connecting this component to the real server.
  * it was built very fast.
  * */

  activeRepo$: Subject<PubRepo> = new Subject()
  activeRepo: PubRepo

  repos: PubRepo[] = []
  activeRepoPublications: Publication[] = []

  p: number = 1

  activeModal: any
  fileUploadButton: Element

  constructor(public repoService: PubReposService,
              private csvParse: PapaParseService,
              private pmc: ArticlesService,
              private notify: NotifyService,
              private modalService: NgbModal, public ps: ActiveProjectService ) {
    this.activeRepo$.asObservable().pipe(
      tap(R => this.activeRepo = R),
      switchMap<PubRepo, Publication[]>(R => this.repoService.getPublications(this.ps.getActiveProject().id+'', R.id)) as any,
      tap((pubs: Publication[]) => this.activeRepoPublications = pubs)
    ).subscribe()

    this.ps.project$.subscribe((project: AppProject) => this.repoService.requestRepos(project.id))

    this.repoService.repos$.subscribe(R => {
      if(this.repos.length == 0 && R.length > 0) // sets the active repo if none is selected
        this.activeRepo$.next(R[0])
      this.repos = R
    })
  }

  ngOnInit() {
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
    this.repoService.createRepo(this.ps.getActiveProject().id+'', newRepoForm)
  }

  handleAddOne() {
    const modalRef = this.modalService.open(AddOneComponent)
    modalRef.componentInstance.onSave.subscribe((pub: Publication) => {
      // new publication ready for save
      this.repoService.addPublications(this.ps.getActiveProject().id+'', this.activeRepo.id, [pub])
        .pipe(
          // TODO - automatically push to publications observable somewhere!!
          switchMap(() => this.reloadPublications())
        )
        .subscribe( () => {
          modalRef.close()
          this.notify.swal.swal("Done", "Article Added Successfully", 'success')
        })
    })
  }

  handlePMCImport() {
    const modalRef = this.modalService.open(PmcImporterComponent)
    modalRef.componentInstance.onSubmit.subscribe((pmcIDs: string[]) => {
      this.pmc.getArticleMetaData(pmcIDs)
        .subscribe((res: PMCResult[]) => {
          let uploadData = res.map( R => ({
            title: R.title,
            embeddingURL: R.embedding_url
          }))
          this.repoService.addPublications(this.ps.getActiveProject().id+'', this.activeRepo.id, uploadData)
            .pipe(switchMap(() => this.reloadPublications()))
            .subscribe()
        })
    })
  }

  handleFileChange(files: File[]) {
    if(files.length === 0) return
    let [file] = files
    this.csvParse.parse(file, {
      skipEmptyLines: true,
      complete: (results, file) => {
        let parsed: Publication[] = results.data.map(([ col1, col2, col3 ]) => ({
          title: col1,
          sourceID: col2,
          embeddingURL: col3
        }))
        const modalRef = this.modalService.open(UploadPreviewComponent, { size: 'lg' });
        modalRef.componentInstance.data = parsed
        modalRef.componentInstance.onConfirm.subscribe(_ => {
          this.repoService.addPublications(this.ps.getActiveProject().id+'', this.activeRepo.id, parsed)
            .pipe(switchMap(() => this.reloadPublications()))
            .subscribe(() => {
              modalRef.close()
              this.notify.swal.swal("Upload Successful", "CSV Uploaded Successfully", 'success')
            })
        })
      }
    })
  }

  private reloadPublications(): Observable<any> {
    return this.repoService.getPublications(this.ps.getActiveProject().id+'', this.activeRepo.id)
      .pipe(
        tap(pubs => this.activeRepoPublications = pubs)
      )
  }

}
