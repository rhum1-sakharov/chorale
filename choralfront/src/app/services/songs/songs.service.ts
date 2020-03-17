import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import {Song} from "./song";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AUTH} from "../../constants";

@Injectable()
export class SongsService {

  constructor(private http: Http) {
  }

  getSongsByExtension(extension: string): Promise<Song[]> {
    let url = 'api/songs/search/extensions?extension=' + extension + '&sort=title,desc&size=9999';
    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json()._embedded.songs as Song[]
      )
      .catch(this.handleError);
  }

  getSongs(): Promise<Song[]> {
    let url = 'api/songs?sort=releaseDate,desc&size=9999';
    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json()._embedded.songs as Song[]
      )
      .catch(this.handleError);
  }

  deleteSong(id: number) {
    let idLet = id;
    let headers = new Headers();
    headers.append('Authorization',localStorage.getItem(AUTH.token));
    let options = new RequestOptions({headers: headers});
    return this.http.delete('api/songs/delete/' + id,options)
      .catch(error => Observable.throw(error))
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
  }

  createSong(song: Song, songFile: File): Promise<Song> {

    let formData: FormData = new FormData();

    if (!songFile) {
      formData.append('myFile', new File([""], ""));
    } else {
      formData.append('myFile', songFile, songFile.name);
    }

    formData.append('compositor', song.compositor);
    formData.append('title', song.title);
    formData.append('band', song.band);
    formData.append('releaseDate', song.releaseDate.getTime());
    formData.append('id', song.id);

    let headers = new Headers();
    headers.append('Authorization',localStorage.getItem(AUTH.token));
    let options = new RequestOptions({headers: headers});

    let url = 'api/songs/add';
    return this.http.post(url, formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .map(song => {
          return song;
        }
      ).toPromise();
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
