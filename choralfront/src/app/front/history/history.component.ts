import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {ActivatedRoute, Router} from "@angular/router";
import {FeedsService} from "../../services/feeds/feeds.service";
import {UtilService} from "../../services/utils/util.service";
import {Title} from "@angular/platform-browser";
// import {slideInDownAnimation} from "../../animations";

@Component({
selector: 'app-history',
  providers: [FeedsService],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
  // animations: [ slideInDownAnimation ]
})
export class HistoryComponent implements OnInit,AfterViewInit {


  @HostBinding('style.display')   display = 'block';

  title: string;
  routeData: any;
  feeds: Feed[];

  constructor(private router: Router,private route:ActivatedRoute, private feedService: FeedsService,public utils:UtilService,private titleSvc:Title) {

  }

  ngOnInit() {
    this.feedService.getFeedsByType('history').subscribe(feeds => this.feeds = feeds);
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;

      this.titleSvc.setTitle('La chorale gourmande - historique');

    });
  }

  ngAfterViewInit(): void {

    this.utils.activeRouteUrl=this.router.url;

  }

}
