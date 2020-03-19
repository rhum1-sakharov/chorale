import {throwError as observableThrowError} from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {Song} from "./song";


import {AUTH} from "../../constants";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export const URL_GET_SONG=`api/songs/getfile/`;

@Injectable()
export class SongsService {

  constructor(private http: HttpClient) {
  }

  getSongsByExtension(extension: string) {
    let url = 'api/songs/search/extensions?extension=' + extension + '&sort=title,desc&size=9999';
    return this.http.get(url).pipe(
      map((response:any)=> response._embedded.songs as Song[]),
      catchError(err=>this.handleError(err))
    );
  }

  getSongs() {
    let url = 'api/songs?sort=releaseDate,desc&size=9999';
    return this.http.get(url)
      .pipe(
        map((response:any)=> response._embedded.songs as Song[]),
        catchError(err=>this.handleError(err))
      );
  }

  deleteSong(id: number) {
    let idLet = id;

    return this.http.delete('api/songs/delete/' + id).pipe(
      catchError(error => observableThrowError(error)))
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      )
  }

  createSong(song: Song, songFile: File) {

    let formData: FormData = new FormData();

    if (!songFile) {
      formData.append('myFile', new File([""], ""));
    } else {
      formData.append('myFile', songFile, songFile.name);
    }

    formData.append('compositor', song.compositor);
    formData.append('title', song.title);
    formData.append('band', song.band);
    formData.append('releaseDate', song.releaseDate.getTime()+'');
    formData.append('id', song.id+'');


    let url = 'api/songs/add';
    return this.http.post(url, formData).pipe(
      map((response:any)=> response._embedded.songs as Song[]),
      catchError(err=>this.handleError(err))
    );
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getSong(song: Song) {

    return this.http.get(URL_GET_SONG+`${song.extension}/${song.id}`,{
      responseType:'blob'
    });



  }
}
