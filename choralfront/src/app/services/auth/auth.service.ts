import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable, OnInit} from '@angular/core';

import {Credentials} from "./credentials";
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';


import {AUTH} from "../../constants";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService implements OnInit {

  jwtService: JwtHelper;

  constructor(private http: HttpClient, private jwtHelper: JwtHelper, private router: Router) {
    this.jwtService = jwtHelper;
  }

  ngOnInit(): void {

    this.jwtHelper = new JwtHelper();
  }

  login(credentials: Credentials): Observable<boolean> {

    return this.http.post('api/auth', credentials).pipe(
      catchError(error => observableThrowError(error)),
      map((data:any) => {
          localStorage.setItem(AUTH.token, data.token);
          return data.token;
        }
      ),);
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
