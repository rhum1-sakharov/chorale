import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import {AUTH} from "../../constants";


import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Config} from "./config";

@Injectable()
export class DiversService {

  constructor(private http: Http) {
  }

  isAudioEnabled(): Promise<Config> {
    let url = 'api/css/isaudioenabled';

    return this.http.get(url)
      .toPromise()
      .then(response =>
        response.json() as Config
      )
      .catch(error=> Observable.throw(error));
  }

  getAudio(): Promise<any> {
    let url = 'api/css/audio';
    return this.http.get(url)
      .map(res => {
        return res;
      })
      .catch(error => Observable.throw(error))
      .toPromise();
  }

  getTheme(): Promise<any> {
    let url = 'api/css/theme';
    return this.http.get(url)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .map(res => {
          return res;
        }
      ).toPromise();
  }

  savePreferences(bgPhoto: File, audioFile: File, theme: string, audioEnabled: boolean): Promise<any> {

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
    formData.append('audioEnabled', audioEnabled);

    let url = 'api/css/save';
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem(AUTH.token));
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, formData, options)
      .map(res => res.json())
      .catch(error => Observable.throw(error))
      .map(res => {
          return res;
        }
      ).toPromise();
  }

}
