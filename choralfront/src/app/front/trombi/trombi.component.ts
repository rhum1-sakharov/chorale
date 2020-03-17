import {Component, OnInit, HostBinding} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {Router, ActivatedRoute} from "@angular/router";
import {FeedsService} from "../../services/feeds/feeds.service";
// import {slideInDownAnimation} from "../../animations";


@Component({
  selector: 'app-trombi',
  providers: [FeedsService],
  templateUrl: './trombi.component.html',
  styleUrls: ['./trombi.component.less'],
  // animations: [ slideInDownAnimation ]
})
export class TrombiComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  title: string;
  routeData: any;
  feeds: Feed[];
  images: any[];

  constructor(private router: Router,private route:ActivatedRoute, private feedService: FeedsService) {
  }

  ngOnInit() {
    this.feedService.getFeedsByType('trombi').subscribe(feeds => {
      this.feeds = feeds
      this.images = [];
      for (let f in feeds) {
        this.images.push({
          source: 'api/files/get/feeds/jpg/'+feeds[f].id,
          alt: feeds[f].title,
          title: feeds[f].title
        });
      }
    });
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }


}
