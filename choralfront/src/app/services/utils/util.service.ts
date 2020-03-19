import { Injectable } from '@angular/core';
import {MessageService} from "primeng";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loading=false;

  constructor(private msgSvc:MessageService) { }

  showMsg(key:string,severity:string,summary:string,detail?:string,sticky?:boolean){
    this.msgSvc.clear();
    this.msgSvc.add({key,severity, summary, detail,sticky});
  }

}
