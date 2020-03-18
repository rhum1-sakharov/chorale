import {Component, OnInit, HostBinding} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {Router, ActivatedRoute} from "@angular/router";
import {FeedsService} from "../../services/feeds/feeds.service";

// import {slideInDownAnimation} from "../../animations";


@Component({

  selector: 'app-news',
  providers: [FeedsService],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less'],
  // animations: [ slideInDownAnimation ]
})
export class NewsComponent implements OnInit {


  @HostBinding('style.display') display = 'block';

  title: string;
  routeData: any;
  images: any[] = [];

  feeds: Feed[];


  constructor(private router: Router, private route: ActivatedRoute, private feedService: FeedsService) {
  }

  ngOnInit() {
    this.feedService.getFeedsByType('actus').subscribe(feeds => {
      this.feeds = feeds;
      this.images = [];
      if (this.feeds) {
        for (const feed of this.feeds) {
          this.images.push({source: `api/files/get/feeds/jpg/${feed.id}`, alt: feed.content, title: feed.title});
        }
      }

      // $('.carousel').carousel();

    });
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }

  isActive(feed: Feed) {
    return feed === this.feeds[0];
  }

  getGalleriaWidth() {
      return window.innerWidth -100;
  }

  getGalleriaHeight() {
    return window.innerHeight -300;
  }
}
