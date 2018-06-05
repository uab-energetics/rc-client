import {Component, OnDestroy, OnInit} from '@angular/core';
import {PubReposService} from "../../../core/pub-repos/pub-repos.service";
import {ActiveProjectService} from "../../../core/active-project/active-project.service";
import {AppProject} from "../../../core/projects/AppProject";
import {PubRepo} from "../../../core/pub-repos/PubRepo";
import {Publication} from "../../../core/pub-repos/Publication";
import {PageAsideComponent} from "../../shared/page-aside/PageAsideComponent";
import {Subject} from "rxjs/Subject";
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PapaParseService} from "ngx-papaparse";
import {UploadPreviewComponent} from "./upload-preview/upload-preview.component";
import {NotifyService} from "../../../core/notifications/notify.service";
import {AddOneComponent} from "./add-one/add-one.component";
import {ArticlesService} from "../../../core/pmc/articles.service";
import {PmcImporterComponent} from "./pmc-importer/pmc-importer.component";
import {PMCResult} from "../../../core/pmc/PMCResult";
import {Observable} from "rxjs/Observable";
import {download} from "../../../core/files/download";
import {select} from "d3-selection";

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
  originalPublications: Publication[]
  activeRepoPublications$: Subject<Publication[]> = new Subject<Publication[]>()
  activeRepoPublications: Publication[] = []

  filterStream$ = new Subject<string>()
  filter: string = ""
  p: number = 1

  activeModal: any
  fileUploadButton: Element

  checked = {}

  constructor(public repoService: PubReposService,
              private csvParse: PapaParseService,
              private pmc: ArticlesService,
              private notify: NotifyService,
              private modalService: NgbModal, public ps: ActiveProjectService ) {

    this.activeRepoPublications$.pipe(
      // always pipe visible publications through the filter
      map(pubs => pubs.filter(P => P.title.toLowerCase().replace(' ', '').includes(this.filter.toLowerCase().replace(' ', ''))))
    ).subscribe(pubs => this.activeRepoPublications = pubs)

    this.filterStream$.pipe(
      debounceTime(10),
      distinctUntilChanged(),
      tap(s => console.log('filtering...', s))
    ).subscribe( F => {
      this.filter = F
      this.activeRepoPublications$.next(this.originalPublications)
    })

    this.activeRepo$.asObservable().pipe(
      map(R => {
        if(!R && this.repos.length > 0)
          return this.repos[0]
        return R
      }),
      filter(R => !!R),
      tap(R => this.activeRepo = R),
      switchMap<PubRepo, Publication[]>(R => this.repoService.getPublications(this.ps.getActiveProject().id+'', R.id)) as any,
      tap((pubs: Publication[]) => {
        this.originalPublications = pubs
        this.activeRepoPublications$.next(pubs)
      })
    ).subscribe()

    this.repoService.repos$.subscribe(R => {
      if(this.repos.length == 0 && R.length > 0) // sets the active repo if none is selected
        this.activeRepo$.next(R[0])
      this.repos = R
    })

    this.ps.project$.subscribe((project: AppProject) => {
      this.repos = []
      this.repoService.requestRepos(project.id)
        .subscribe()
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

  handleDeleteRepo(repo: PubRepo = this.activeRepo) {
    this.notify.swal({
      title: 'Are you sure?',
      text: "You are about to delete the repo: " + repo.displayName + " and all associated publications. This cannot be undone",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, wait! Don\'t delete it!'
    }).then((result) => {
      if (result.value) {
        this.repoService.deleteRepo(this.ps.getActiveProject().id.toString(), repo.id)
          .subscribe(() => {
            this.activeRepo$.next(null)
            this.notify.toast(`Repo (${repo.id}) deleted.`)
          })
      } else if (result.dismiss) {
        this.notify.swal(
          'Cancelled',
          'Your repo is safe',
          'error'
        )
      }

    }).catch(() => {})
  }

  handleNewRepoSubmit(newRepoForm: PubRepo) {
    this.repoService.createRepo(this.ps.getActiveProject().id+'', newRepoForm)
      .subscribe((repo: PubRepo) => {
        this.closeModal()
        this.activeRepo$.next(repo)
        this.notify.swal("Done", "Repo Created!", 'success')
      })
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
          this.notify.swal("Done", "Article Added Successfully", 'success')
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
          embeddingURL: col3 || col2
        }))
        if(parsed.length === 0) {
          this.notify.swal("No rows found", "Please check the format of your CSV", 'error')
          return
        }
        const modalRef = this.modalService.open(UploadPreviewComponent, { size: 'lg' });
        modalRef.componentInstance.data = parsed
        modalRef.componentInstance.onConfirm.subscribe(_ => {
          this.repoService.addPublications(this.ps.getActiveProject().id+'', this.activeRepo.id, parsed)
            .pipe(switchMap(() => this.reloadPublications()))
            .subscribe(() => {
              modalRef.close()
              this.notify.swal("Upload Successful", "CSV Uploaded Successfully", 'success')
            })
        })
      }
    })
  }

  handleDownload(onlySelected = false) {
    let repos: Publication[] = this.activeRepoPublications
    if(onlySelected) {
      let selectedSet = new Set<string>(this.getSelected())
      repos = repos.filter(P => selectedSet.has(P.id+''))
    }
    repos = repos.map( P => {
      return {
        title: P.title,
        embeddingURL: P.embeddingURL
      }
    })
    if(repos.length === 0) {
      this.notify.swal('There are no repos selected', '', 'info')
      return
    }
    let csv = this.csvParse.unparse(repos, {
      header: false,
      quotes: true
    })
    download('repo-pubs-export.csv', csv)
  }

  private reloadPublications(): Observable<any> {
    return this.repoService.getPublications(this.ps.getActiveProject().id+'', this.activeRepo.id)
      .pipe(
        tap(pubs => this.activeRepoPublications = pubs)
      )
  }


  /* BULK ACTIONS
  * TODO - move this logic into another service/component
  * =================== */

  getSelected(): string[] {
    return Object.entries(this.checked)
      .filter(([key, val]) => !!val)
      .map(([key, val]) => key)
  }

  selectAll() {
    this.activeRepoPublications.forEach(P => this.checked[P.id] = true)
  }

  deselectAll() {
    this.checked = {}
  }

  selectedDelete() {
    let pubIDs = this.getSelected()
    let msg = `You're about to delete ${pubIDs.length} articles? `
    if(pubIDs.length === this.originalPublications.length)
      msg = `You're about to delete ALL articles. `
    msg += "This action cannot be undone!"

    this.notify.swal({
      title: 'Are you sure?',
      text: msg,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete them!',
      cancelButtonText: 'No, wait! Don\'t delete them!'
    }).then((result) => {
      if (result.value) {
        this.repoService.removePublications(this.ps.getActiveProject().id+'', this.activeRepo.id, pubIDs)
          .pipe(switchMap(() => this.reloadPublications()))
          .subscribe(() => {
            this.notify.swal("Done", "Publications Deleted", 'success')
            this.deselectAll()
          })
      } else if (result.dismiss) {
        this.notify.swal(
          'Cancelled',
          'Your articles are safe',
          'error'
        )
      }

    }).catch(() => {})
  }

}
