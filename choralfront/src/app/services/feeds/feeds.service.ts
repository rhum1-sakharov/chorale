import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {Feed} from "./feed";


import {AUTH} from "../../constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class FeedsService {

  constructor(private http: HttpClient) {
  }

  getFeeds() {
    let url = 'api/feeds?sort=top,desc&sort=creationDate,desc&size=9999';

    return this.http.get(url).pipe(
      map((response: any) => response._embedded.feeds),
      catchError(error => this.handleError(error))
    )

  }

  getFeedsByType(type: string) {
    let url = 'api/feeds/search/types?type=' + type + '&sort=top,desc&sort=creationDate,desc&size=9999';
    return this.http.get(url).pipe(
      map((response: any) => response._embedded.feeds),
      catchError(error => this.handleError(error))
    );

  }


  createFeed(feed: Feed, feedFile: File){

    let formData: FormData = new FormData();

    if (!feedFile) {
      formData.append('myFile', new File([""], ""));
    } else {
      formData.append('myFile', feedFile, feedFile.name);
    }

    formData.append('photoEnabled', feed.photoEnabled?'true':'false');

    formData.append('title', feed.title);
    formData.append('content', feed.content);
    formData.append('creationDate', feed.creationDate.getTime()+'');
    formData.append('author', feed.author);
    formData.append('type', feed.type);
    formData.append('top', feed.top ? 'true':'false');
    formData.append('imagePosition', feed.imagePosition);
    formData.append('imageWidth', feed.imageWidth);
    formData.append('id', feed.id+'');

    let url = 'api/feeds/add';


    return this.http.post(url, formData ).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteFeed(id: number) {
    let idLet = id;

    return this.http.delete('api/feeds/delete/' + id).pipe(
      catchError(error => observableThrowError(error)));

  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
