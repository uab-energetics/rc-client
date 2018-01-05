import {Injectable} from '@angular/core';
import {AppForm} from "../../models/AppForm";
import {AppProject} from "../../models/AppProject";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, share} from "rxjs/operators";
import {AppPublication} from "../../models/AppPublication";
import * as _ from "lodash";
import {AppUser} from "../../models/AppUser";
import {AppFormPublication} from "../../models/AppFormPublication";

const api = environment.api;

@Injectable()
export class ProjectFormService {

  constructor(private http: HttpClient) {
  }

  public getPrefix(project: AppProject, form: AppForm) {
    return api + "/projects/" + project.id + "/forms/" + form.id;
  }

  getPublications(project: AppProject, form: AppForm) {
    return this.http.get<AppPublication[]>(this.getPrefix(project, form) + "/publications")
      .share();
  }

  addPublication(project: AppProject, form: AppForm, publication: AppPublication, priority) {
    let data = {priority:priority};
    return this.http.post<AppFormPublication>(this.getPrefix(project, form)+"/publications/"+publication.id, data)
      .share();
  }

  addPublications(project: AppProject, form: AppForm, publications: AppPublication[], priority) {
    let data = {
      priority : priority,
      publications : publications.map( pub => pub.id )
    };
    return this.http.post<AppFormPublication>(this.getPrefix(project, form)+"/publications", data)
      .share();
  }

  getEncoders(project: AppProject, form: AppForm) {
    return this.http.get<AppUser[]>(this.getPrefix(project, form) + "/encoders")
      .share();
  }

  addEncoder(project: AppProject, form: AppForm, encoder: AppUser) {
    return this.http.post<any>(this.getPrefix(project, form)+"/encoders/"+encoder.id, {})
      .share();
  }

  addEncoders(project: AppProject, form: AppForm, encoders: AppUser[]) {
    let data = { encoders : encoders.map( user => user.id ) };
    return this.http.post<any>(this.getPrefix(project, form)+"/encoders", data)
      .share();
  }

}
