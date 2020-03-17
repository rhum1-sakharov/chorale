import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable()
export class VisitorsService {

  constructor(private http: HttpClient) {
  }

  getNbVisitors() {
    let url = 'api/visitors/nbvisitors';

    return this.http.get(url)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }


  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
