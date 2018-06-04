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

  constructor(public repoService: PubReposService, private modalService: NgbModal, public ps: ActiveProjectService ) {
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

  openModal(content) {
    this.activeModal = this.modalService.open(content)
  }

  closeModal() {
    if(!this.activeModal) return
    this.activeModal.close()
  }

  handleNewRepoSubmit(newRepoForm: PubRepo) {
    console.log('creating repo', newRepoForm)
    this.repoService.createRepo(12, newRepoForm)
  }

}
