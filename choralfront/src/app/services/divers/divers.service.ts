import {throwError as observableThrowError} from 'rxjs';

import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AUTH, MSG_KEY, MSG_SEVERITY} from "../../constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UtilService} from "../utils/util.service";
import {of} from "rxjs/internal/observable/of";

@Injectable()
export class DiversService {

  constructor(private http: HttpClient, private utils: UtilService) {
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
    formData.append('audioEnabled', audioEnabled ? 'true' : 'false');

    let url = 'api/css/save';

    return this.http.post(url, formData, ).pipe(
      catchError(error => {
        this.utils.showMsg(MSG_KEY.ROOT, MSG_SEVERITY.ERROR, JSON.stringify(error), '', true);
        return error;
      }));
  }

}
