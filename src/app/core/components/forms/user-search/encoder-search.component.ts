import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {of} from "rxjs/observable/of";
import {AppUser} from "../../../../models/AppUser";
import {ProjectService} from "../../../../shared/services/project.service";
import {Input} from "@angular/core";
import {AppProject} from "../../../../models/AppProject";

@Component({
  selector: 'app-encoder-search',
  templateUrl: './encoder-search.component.html',
  styleUrls: ['./encoder-search.component.css']
})
export class EncoderSearchComponent {

  @Input() project: AppProject;

  constructor(
    private service: ProjectService
  ) { }

  model: any;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  search = (text$: Observable<string>) => {
    return text$.debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.service.getEncoders(this.project.id, term)
          .do(() => this.searchFailed = false)
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed);
  };

  formatter = (encoder: AppUser) => encoder.name

}
