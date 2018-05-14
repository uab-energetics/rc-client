import {Injectable} from '@angular/core'
import {AppExperimentEncoding} from './AppExperimentEncoding'
import {Observable} from 'rxjs/Observable'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import {AppResponse} from '../form-responses/AppResponse'
import {AppBranch} from '../form-branch/AppBranch'
import {JwtService} from '../auth/jwt.service'
import {AppEncodingTask} from "../tasks/AppEncodingTask";
import {PaginationOptions} from '../pagination/PaginationOptions'

const api = environment.api;

@Injectable()
export class EncodingService {

  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) { }

  getEncoding(id: number): Observable<AppExperimentEncoding> {
    return this.http.get<AppExperimentEncoding>(`${api}/encodings/${id}`)
      .share();
  }

  recordResponse(encoding_id: number, branch_id: number, response: AppResponse): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${api}/encodings/${encoding_id}/branches/${branch_id}/responses`, response)
      .share();
  }

  deleteBranch(encoding_id: number, branch_id: number): Observable<void> {
    return this.http.delete<void>(`${api}/encodings/${encoding_id}/branches/${branch_id}`)
      .share();
  }

  recordBranch(encoding_id: number, branch: AppBranch): Observable<AppBranch> {
    return this.http.post<AppBranch>(`${api}/encodings/${encoding_id}/branches`, branch)
      .share();
  }

  myEncodings(): Observable<AppExperimentEncoding[]> {
    return this.http.get<AppExperimentEncoding[]>(`${api}/users/encodings`)
      .share()
  }


  selfAssign(form_id: number, publication_id: number): Observable<AppExperimentEncoding[]> {
    return this.http.post<AppExperimentEncoding[]>(`${api}/assignments/manual`, {
      form_id,
      publication_id,
      user_id: this.jwt.user.id
    }).share()
  }

  quitEncoding(encoding_id: number): Observable<void> {
    return this.http.delete<void>(`${api}/encodings/${encoding_id}`)
      .share();
  }
}
