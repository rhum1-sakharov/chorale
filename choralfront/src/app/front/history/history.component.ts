import {Component, OnInit, Sanitizer, HostBinding} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {Router, ActivatedRoute} from "@angular/router";
import {FeedsService} from "../../services/feeds/feeds.service";
import {slideInDownAnimation} from "../../animations";

@Component({
selector: 'app-history',
  providers: [FeedsService],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less'],
  animations: [ slideInDownAnimation ]
})
export class HistoryComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  title: string;
  routeData: any;
  feeds: Feed[];

  constructor(private router: Router,private route:ActivatedRoute, private feedService: FeedsService) {

  }

  ngOnInit() {
    this.feedService.getFeedsByType('history').then(feeds => this.feeds = feeds);
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }

}
