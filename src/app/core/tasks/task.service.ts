import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {JwtService} from '../auth/jwt.service'
import {AppEncodingTask} from "./AppEncodingTask"
import {AppExperimentEncoding} from "../encodings/AppExperimentEncoding"

const api = environment.api

@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) {
  }

  getTask(task_id: number): Observable<AppEncodingTask> {
    return this.http.get<AppEncodingTask>(`${api}/tasks/${task_id}`)
      .share()
  }

  updateCompletion(task_id: number, complete: boolean): Observable<any> {
    return this.http.put<any>(`${api}/tasks/${task_id}/completion`, {complete: complete})
      .share()
  }

  myTasks(params: any = {page: 1, page_size: 20}, status: string = null): Observable<AppEncodingTask[]> {
    if (status !== null) {
      params = {...params, status: status}
    }
    return this.http.get<AppEncodingTask[]>(`${api}/users/tasks`, {params})
      .share()
  }

  myNextTasks(): Observable<AppEncodingTask[]> {
    return this.http.get<AppEncodingTask[]>(`${api}/users/tasks/next`)
      .share()
  }

  startEncoding(task_id: number): Observable<AppExperimentEncoding> {
    return this.http.get<any>(`${api}/tasks/${task_id}/start-encoding`)
      .share()
      .map(response => response.encoding)
  }

  quitTask(task_id: number): Observable<void> {
    return this.http.delete<void>(`${api}/tasks/${task_id}`)
      .share()
  }


}
