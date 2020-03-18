import {Observable, throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable, OnInit} from '@angular/core';

import {Credentials} from "./credentials";



import {AUTH} from "../../constants";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthService implements OnInit {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
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

    const token= localStorage.getItem(AUTH.token);

    if (!this.jwtService.isTokenExpired(token)) {
      let tokenStr: any = this.jwtService.decodeToken(token);

      if(tokenStr){
        //iterate over roles of user
        tokenStr.sub.authorities.map(res => {
          if (res.authority.substring(5) == role) {
            userHasAccess = true;
          }
        });
      }


    }
    return userHasAccess;
  }

}
