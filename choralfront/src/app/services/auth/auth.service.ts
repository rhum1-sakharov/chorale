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

    let body = new FormData();
    body.set('grant_type', 'password');
    body.set('username', credentials.username);
    body.set('password', credentials.password);
    body.set('client_id', 'chorale');
    body.set('client_secret', 'mySecret');


    // let headers = new HttpHeaders({'Authorization': 'Basic ' + btoa("dolapp:fdlebtrvl")});

    // const error = {status:500,statusText:'erreur non comprise'};
    // this.utils.handleError(error,true);

    return this.http.post('api/oauth/token', body).pipe(
      catchError(error => observableThrowError(error)),
      map((data:any) => {
          localStorage.setItem(AUTH.token, data.access_token);
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
        tokenStr.authorities.map(res => {
          if (res.substring(5) === role) {
            userHasAccess = true;
          }
        });
      }


    }
    return userHasAccess;
  }

}
