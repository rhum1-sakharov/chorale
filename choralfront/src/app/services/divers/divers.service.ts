import {throwError as observableThrowError} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AUTH} from "../../constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class DiversService {

  constructor(private http: HttpClient) {
  }

  isAudioEnabled() {
    let url = 'api/css/isaudioenabled';

    return this.http.get(url).pipe(
      catchError(error => observableThrowError(error))
    );

  }

  getAudio() {
    let url = 'api/css/audio';
    return this.http.get(url).pipe(
      catchError(error => observableThrowError(error)));

  }

  getTheme() {
    let url = 'api/css/theme';
    return this.http.get(url).pipe(
      catchError(error => observableThrowError(error)));
  }

  savePreferences(bgPhoto: File, audioFile: File, theme: string, audioEnabled: boolean) {

    let formData: FormData = new FormData();

    if (!bgPhoto) {
      formData.append('myBg', new File([""], ""));
    } else {
      formData.append('myBg', bgPhoto, bgPhoto.name);
    }

    if (!audioFile) {
      formData.append('myAudio', new File([""], ""));
    } else {
      formData.append('myAudio', audioFile, audioFile.name);
    }

    formData.append('theme', theme);
    formData.append('audioEnabled', audioEnabled?'true':'false');

    let url = 'api/css/save';

    return this.http.post(url, formData, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem(AUTH.token))
    }).pipe(
      catchError(error => observableThrowError(error)));
  }

}
