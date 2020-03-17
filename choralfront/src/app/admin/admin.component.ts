import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({

  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  title: string;
  routeData: any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }

}
