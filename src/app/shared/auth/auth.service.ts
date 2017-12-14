import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  login(loginRequest: { email: string, password: string }): Promise<any> {
    console.log(loginRequest);
    return new Promise((resolve, reject) => {
      this.http.post(environment.api + '/auth/login', loginRequest)
        .toPromise()
        .then((jwt_response: Response) => {
          const jwt = jwt_response['token'];
          this.userService.setSession(jwt, { name: 'text', email: 'test'});
          resolve(jwt_response);
        }, reject);
    });
  }

  logout() {
    this.userService.clearSession();
    this.router.navigate(['/auth/login'])
  }

}
