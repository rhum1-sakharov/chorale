import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  template: '<h1 class="white" [innerHTML]="title"></h1>'
})
export class PageNotFoundComponent implements OnInit {

  title: string;
  routeData: any;


  constructor( private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }

}
