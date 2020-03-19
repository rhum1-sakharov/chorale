import {AfterViewInit, Component, DoCheck, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {VisitorsService} from "./services/visitors/visitors.service";
import {DiversService} from "./services/divers/divers.service";
import {Config} from "./services/divers/config";
import {UtilService} from "./services/utils/util.service";

@Component({
  selector: 'app-root',
  providers: [VisitorsService, DiversService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit,AfterViewInit {

  audioEnabled: boolean = false;
  nbVisitors: string;

  windowWidth:number;

  constructor(public utils:UtilService,private router: Router, public route: ActivatedRoute, private visitorService: VisitorsService, private diversServive: DiversService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowWidth=window.innerWidth;
  }


  ngOnInit() {

    this.windowWidth=window.innerWidth;



    // this.router.navigate([this.activeMenu]);




    this.visitorService.getNbVisitors().subscribe(message => this.nbVisitors = message.valueMsg);
    this.diversServive.isAudioEnabled().subscribe((config:Config) => {
      this.audioEnabled = config.value === 'true' ? true : false;
    });
  }


  getMarginTop() {

    if(this.windowWidth>540){
      return 125;
    }

    return 300;
  }

  ngAfterViewInit(): void {


  }
}
