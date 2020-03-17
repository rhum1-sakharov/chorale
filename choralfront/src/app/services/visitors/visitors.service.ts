import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Message} from "./message";

@Injectable()
export class VisitorsService {

  constructor(private http: Http) { }

  getNbVisitors(): Promise<Message> {
    let url='api/visitors/nbvisitors';

    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Message
      )
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
