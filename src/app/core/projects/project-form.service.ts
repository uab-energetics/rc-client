import {Injectable} from '@angular/core'
import {AppForm} from "../forms/AppForm"
import {AppProject} from "./AppProject"
import {Observable} from "rxjs/Observable"
import {HttpClient} from "@angular/common/http"
import {environment} from "../../../environments/environment"
import {AppPublication} from "../publications/AppPublication"
import {AppFormPublication} from "../forms/AppFormPublication"
import {AppProjectFormSettings} from "../forms/AppProjectFormSettings"
import {AppProjectForm} from "../forms/AppProjectForm"
import {PaginatedResult} from "../pagination/PaginatedResult"
import {PaginationOptions} from "../pagination/PaginationOptions"
import {JwtService} from '../auth/jwt.service'
import {User} from '../auth/models/User'

const api = environment.api

@Injectable()
export class ProjectFormService {

  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) {}

  public getPrefix(project: AppProject, form: AppForm) {
    return api + "/projects/" + project.id + "/forms/" + form.id
  }

  getSettings(project: AppProject, form: AppForm) {
    return this.http.get<AppProjectFormSettings>(this.getPrefix(project, form))
      .share()
  }

  updateSettings(project: AppProject, form: AppForm, settings:AppProjectFormSettings) {
    return this.http.put<AppProjectFormSettings>(this.getPrefix(project, form), settings)
      .share()
  }

  getProjectForm(projectId, formId) {
    return this.http.get<AppProjectForm>(`${api}/projects/${projectId}/forms/${formId}`)
      .share()
  }

  getPublications(project: AppProject, form: AppForm, options: PaginationOptions = { page: 1, page_size: 20 }): Observable<PaginatedResult<AppFormPublication>> {
    let params: any = Object.assign({}, options)
    return this.http.get<PaginatedResult<AppFormPublication>>(this.getPrefix(project, form) + "/publications", {params})
      .share()
  }

  addPublication(project: AppProject, form: AppForm, publication: AppPublication, priority) {
    let data = {priority:priority}
    return this.http.post<AppFormPublication>(this.getPrefix(project, form)+"/publications/"+publication.id, data)
      .share()
  }

  addPublications(project: AppProject, form: AppForm, publicationIDs: number[], priority = null) {
    let data = {
      publications : publicationIDs
    }
    if (priority) data['priority'] = priority
    return this.http.post<AppFormPublication>(this.getPrefix(project, form)+"/publications", data)
      .share()
  }

  inheritProjectPublications(project: AppProject, form: AppForm) {
    return this.http.get<any>(this.getPrefix(project, form)+"/inherit-project-publications")
      .share()
  }

  inheritProjectEncoders(project: AppProject, form: AppForm) {
    return this.http.get<any>(this.getPrefix(project, form)+"/inherit-project-encoders")
      .share()
  }

  removePublication(project: AppProject, form: AppForm, publication: AppPublication) {
    return this.http.delete<any>(this.getPrefix(project, form)+"/publications/"+publication.id)
  }

  getEncoders(project: AppProject, form: AppForm) {
    return this.http.get<User[]>(this.getPrefix(project, form) + "/encoders")
      .share()
  }

  addEncoder(project: AppProject, form: AppForm, encoder: User) {
    return this.http.post<any>(this.getPrefix(project, form)+"/encoders/"+encoder.id, {})
      .share()
  }

  removeEncoder(projectID: number, formID: number, userID: number): Observable<any> {
    return this.http.delete(`${api}/projects/${projectID}/forms/${formID}/encoders/${userID}`)
  }

  addEncoders(project: AppProject, form: AppForm, encoders: User[]) {
    let data = { encoders : encoders.map( user => user.id ) }
    return this.http.post<any>(this.getPrefix(project, form)+"/encoders", data)
      .share()
  }

  getProjectFormsEncoder() {
    return this.http.get<AppProjectForm[]>(api + "/users/forms")
      .share()
  }

  requestMyTasks(project: AppProject, form: AppForm, count = null) {
    let data = {}
    if (count) {data['count'] = count}
    return this.http.post<any>(this.getPrefix(project, form)+'/request-my-tasks', data)
      .share()
  }

  requestTasks(project: AppProject, form: AppForm, encoder: User, count = null) {
    let data = {}
    if (count) {data['count'] = count}
    return this.http.post<any>(this.getPrefix(project, form)+"/encoders/"+encoder.id+'/request-tasks', data)
      .share()
  }

}
