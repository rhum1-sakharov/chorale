import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import {Feed} from "./feed";
import {FilesService} from "../files/files.service";


import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AUTH} from "../../constants";

@Injectable()
export class FeedsService {

  constructor(private http: Http) { }

  getFeeds(): Promise<Feed[]> {
    let url='api/feeds?sort=top,desc&size=9999';
    let headers = new Headers();
    headers.append('Authorization',localStorage.getItem(AUTH.token));
    let options = new RequestOptions({headers: headers});
    return this.http.get(url,options)
      .toPromise()
      .then(response =>
        response.json()._embedded.feeds as Feed[]
      )
      .catch(this.handleError);
  }

  getFeedsByType(type:string): Promise<Feed[]> {
    let url = 'api/feeds/search/types?type='+type+'&sort=top,desc&sort=creationDate,desc&size=9999';
    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json()._embedded.feeds as Feed[]
      )
      .catch(this.handleError);
  }


  createFeed(feed: Feed, feedFile: File): Promise<Feed> {

    let formData: FormData = new FormData();


    if (!feedFile) {
      formData.append('myFile', new File([""], ""));
    } else {
      formData.append('myFile', feedFile, feedFile.name);
    }

    formData.append('photoEnabled', feed.photoEnabled);

    formData.append('title', feed.title);
    formData.append('content', feed.content);
    formData.append('creationDate', feed.creationDate.getTime());
    formData.append('author', feed.author);
    formData.append('type', feed.type);
    formData.append('top', feed.top);
    formData.append('imagePosition', feed.imagePosition);
    formData.append('imageWidth', feed.imageWidth);
    formData.append('id', feed.id);


    let headers = new Headers();
    headers.append('Authorization',localStorage.getItem(AUTH.token));
    let options = new RequestOptions({headers: headers});
    let url ='api/feeds/add';
    return this.http.post(url, formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .map(news => {
          return news;
        }
      ).toPromise();
  }

  deleteFeed(id: number) {
    let idLet= id;
    let headers = new Headers();
    headers.append('Authorization',localStorage.getItem(AUTH.token));
    let options = new RequestOptions({headers: headers});

    return this.http.delete('api/feeds/delete/' + id,options)
      .catch(error => Observable.throw(error))
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
