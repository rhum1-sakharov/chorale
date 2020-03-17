import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {VisitorsService} from "./services/visitors/visitors.service";
import {DiversService} from "./services/divers/divers.service";
import {Config} from "./services/divers/config";

@Component({
  selector: 'app-root',
  providers: [VisitorsService, DiversService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  audioEnabled: boolean = false;
  nbVisitors: string;

  constructor(private router: Router, private route: ActivatedRoute, private visitorService: VisitorsService, private diversServive: DiversService) {
  }

  ngOnInit() {
    this.visitorService.getNbVisitors().subscribe(message => this.nbVisitors = message.valueMsg);
    this.diversServive.isAudioEnabled().subscribe((config:Config) => {
      this.audioEnabled = config.value === 'true' ? true : false;
    });
  }

}
