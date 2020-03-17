import {Injectable, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Credentials} from "./credentials";
import {Message} from "primeng/primeng";
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';


import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AUTH, HEADERS_JSON, OPTIONS} from "../../constants";
import {Router} from "@angular/router";

@Injectable()
export class AuthService implements OnInit {

  jwtService: JwtHelper;

  constructor(private http: Http, private jwtHelper: JwtHelper, private router: Router) {
    this.jwtService = jwtHelper;
  }

  ngOnInit(): void {

    this.jwtHelper = new JwtHelper();
  }

  login(credentials: Credentials): Observable<boolean> {

    return this.http.post('api/auth', credentials, OPTIONS)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .map(data => {
          localStorage.setItem(AUTH.token, data.token);
          return data.token;
        }
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  checkUserAccess(role: string) {
    let userHasAccess: boolean = false;
    if (tokenNotExpired(AUTH.token)) {
      let token: any = this.jwtService.decodeToken(localStorage.getItem(AUTH.token));
      //iterate over roles of user
      token.sub.authorities.map(res => {
        if (res.authority.substring(5) == role) {
          userHasAccess = true;
        }
      });
    }
    return userHasAccess;
  }

}
