import {Component, HostBinding, OnInit} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {ActivatedRoute, Router} from "@angular/router";
import {FeedsService} from "../../services/feeds/feeds.service";
// import {slideInDownAnimation} from "../../animations";

@Component({

  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less'],
  // animations: [ slideInDownAnimation ]
})
export class EventsComponent implements OnInit {


  @HostBinding('style.display')   display = 'block';

  title: string;
  routeData: any;


  feeds: Feed[];

  constructor(private router:Router,private route:ActivatedRoute, private feedService:FeedsService) { }

  ngOnInit() {
    this.feedService.getFeedsByType('events').subscribe(feeds => this.feeds = feeds);
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }

}
