import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {ActivatedRoute, Router} from "@angular/router";
import {FeedsService} from "../../services/feeds/feeds.service";
import {UtilService} from "../../services/utils/util.service";

// import {slideInDownAnimation} from "../../animations";

@Component({

  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less'],
  // animations: [ slideInDownAnimation ]
})
export class EventsComponent implements OnInit,AfterViewInit {


  @HostBinding('style.display') display = 'block';

  title: string;
  routeData: any;


  feeds: Feed[];

  constructor(private router: Router, private route: ActivatedRoute, private feedService: FeedsService,public utils:UtilService) {
  }

  ngOnInit() {

    this.feedService.getFeedsByType('events').subscribe(feeds => this.feeds = feeds);

    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }

  ngAfterViewInit(): void {

    this.utils.activeRouteUrl=this.router.url;

  }

}
