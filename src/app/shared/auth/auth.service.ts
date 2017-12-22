import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AppUser} from "../../models/AppUser";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticatedResponse {
  status: string;
  message: string;
  token: string;
  user: AppUser;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

@Injectable()
export class AuthService {

  redirectURL: string;
  sessionExpired: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) { }

  login(loginRequest: LoginRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api + '/auth/login', loginRequest)
        .toPromise()
        .then((jwt_response: AuthenticatedResponse) => {

          const jwt = jwt_response.token;
          const user = jwt_response.user;

          this.userService.setSession(jwt, user);

          resolve(jwt_response);
        }, reject);
    });
  }

  register (registerRequest : RegisterRequest) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api + '/auth/register', registerRequest)
        .toPromise()
        .then((jwt_response : AuthenticatedResponse) => {
          console.log(jwt_response);
          const jwt = jwt_response.token;
          const user = jwt_response.user;

          this.userService.setSession(jwt, user);

          resolve(jwt_response);
        }, reject)
    });
  }

  logout() {
    this.userService.clearSession();
    this.router.navigate(['/auth/login'])
  }

}
