import {Component, OnInit, HostBinding, HostListener, AfterViewInit} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {Router, ActivatedRoute} from "@angular/router";
import {FeedsService} from "../../services/feeds/feeds.service";
import {UtilService} from "../../services/utils/util.service";
import {Title} from "@angular/platform-browser";

// import {slideInDownAnimation} from "../../animations";


@Component({

  selector: 'app-news',
  providers: [FeedsService],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less'],
  // animations: [ slideInDownAnimation ]
})
export class NewsComponent implements OnInit,AfterViewInit {


  @HostBinding('style.display') display = 'block';

  title: string;
  routeData: any;
  images: any[] = [];

  feeds: Feed[];

  photoWidth='200px';


  constructor(private router: Router,public utils:UtilService, private route: ActivatedRoute, private feedService: FeedsService, private titleSvc:Title) {
  }

  getPhotoWidth(){
    let photoWidth='1000px';
    if(window.innerWidth<1200){
      photoWidth=(window.innerWidth-175)+'px';
    }
    return photoWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.photoWidth=this.getPhotoWidth();
  }


  ngOnInit() {

    this.photoWidth=this.getPhotoWidth();

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

      this.titleSvc.setTitle('La chorale gourmande - actualités');
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

  ngAfterViewInit(): void {

    this.utils.activeRouteUrl=this.router.url;

  }
}
