import {Component, OnDestroy, OnInit} from '@angular/core';
import {PubReposService} from "../../../core/pub-repos/pub-repos.service";
import {ActiveProjectService} from "../../../core/active-project/active-project.service";
import {AppProject} from "../../../core/projects/AppProject";
import {PubRepo} from "../../../core/pub-repos/PubRepo";
import {Publication} from "../../../core/pub-repos/Publication";
import {PageAsideComponent} from "../../shared/page-aside/PageAsideComponent";

@Component({
  selector: 'app-pub-repos',
  templateUrl: './pub-repos.component.html',
  styleUrls: ['./pub-repos.component.scss']
})
export class PubReposComponent extends PageAsideComponent implements OnInit, OnDestroy {

  activeRepo: PubRepo
  repos: PubRepo[]
  activeRepoPublications: Publication[]

  p: number = 1

  constructor(public repoService: PubReposService, public ps: ActiveProjectService ) {
    super()

    this.repoService.repos$
      .subscribe(R => this.repos = R)

    this.ps.project$.subscribe((project: AppProject) => {
      this.repoService.requestRepos(project.id)
    })
  }

}
