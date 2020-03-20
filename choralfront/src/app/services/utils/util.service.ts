import { Injectable } from '@angular/core';
import {MessageService} from "primeng";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  loading=false;
  activeRouteUrl='';

  constructor(private msgSvc:MessageService) { }

  showMsg(key:string,severity:string,summary:string,detail?:string,sticky?:boolean){
    this.msgSvc.clear();
    this.msgSvc.add({key,severity, summary, detail,sticky});
  }


  getPortWidth(){

    let portWidth=1050;

    if(window.innerWidth<670){
      portWidth = window.innerWidth-15;
    }else if(window.innerWidth<1200){
      portWidth = window.innerWidth-25;
    }

    return portWidth;
  }
}
