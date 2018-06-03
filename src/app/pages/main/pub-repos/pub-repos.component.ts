import {Component, OnInit} from '@angular/core';
import {PubReposService} from "../../../core/pub-repos/pub-repos.service";
import {ActiveProjectService} from "../../../core/active-project/active-project.service";
import {AppProject} from "../../../core/projects/AppProject";
import {PubRepo} from "../../../core/pub-repos/PubRepo";

@Component({
  selector: 'app-pub-repos',
  templateUrl: './pub-repos.component.html',
  styleUrls: ['./pub-repos.component.scss']
})
export class PubReposComponent implements OnInit {

  repos: PubRepo[]
  p: number = 1

  constructor(
    public pubReposService: PubReposService,
    public ps: ActiveProjectService
  ) {
  }

  ngOnInit() {
    this.pubReposService.repos$
      .subscribe(R => this.repos = R)

    this.ps.project$.subscribe((project: AppProject) => {
      this.pubReposService.requestRepos(project.id)
    })

  }

}
