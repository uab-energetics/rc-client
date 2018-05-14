import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {JwtService} from '../auth/jwt.service'
import {AppEncodingTask} from "./AppEncodingTask";
import {AppExperimentEncoding} from "../encodings/AppExperimentEncoding";

const api = environment.api;

@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) { }

  myTasks(params: any = { page: 1, page_size: 20 }): Observable<AppEncodingTask[]> {
    return this.http.get<AppEncodingTask[]>(`${api}/users/tasks`, { params })
      .share()
  }

  startEncoding(task_id: number): Observable<AppExperimentEncoding> {
    return this.http.get<AppExperimentEncoding>(`${api}/tasks/${task_id}/start-encoding`)
      .share()
  }

  quitTask(task_id: number): Observable<void> {
    return this.http.delete<void>(`${api}/tasks/${task_id}`)
      .share();
  }


}
