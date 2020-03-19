import {Component, OnInit} from '@angular/core';
import {Feed} from "../../services/feeds/feed";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {FeedsService} from "../../services/feeds/feeds.service";
import { PHOTO_WIDTHS, FRENCH_CALENDAR} from "../../constants";
import {SelectItem} from "primeng";



@Component({

  selector: 'app-admin-feeds',
  providers: [FeedsService],
  templateUrl: './admin-feeds.component.html',
  styleUrls: ['./admin-feeds.component.less']
})
export class AdminFeedsComponent implements OnInit {

  feeds: Feed[];
  displayDialog: boolean = false;
  newFeed: boolean = false;
  feedFile: File;
  fr: any;
  feedForm: FormGroup;
  feed: Feed;
  selectedFeed: Feed;
  types: SelectItem[];
  photoWidths: SelectItem[] = [];


// <p-column field="type" header="Type" [sortable]="true"></p-column>
//     <p-column field="title" header="Titre" [sortable]="true"></p-column>
//     <p-column field="author" header="Auteur" [sortable]="true" [filter]="true" filterMatchMode="contains"></p-column>
//     <p-column field="creationDate" header="Date de création" [sortable]="true"></p-column>
//     <p-column field="top" header="Top" [sortable]="true"></p-column>
//     <p-column field="id" header="Id" [sortable]="true"></p-column>


  cols:any[]=[
    {field:'id',header:'Id'},
    {field:'title',header:'Titre'},
    {field:'author',header:'Auteur'},
    {field:'creationDate',header:'Date de création'},
    {field:'top',header:'Top'},

  ];

  getTypeLabel(value:string){
    for (const type of this.types) {
      if(type.value === value){
        return type.label;
      }
    }
  }

  constructor(private router: Router, private builder: FormBuilder, private feedsService: FeedsService) {

    this.types = [];
    this.types.push({label: "Actualité", value: 'actus'});
    this.types.push({label: "Historique", value: 'history'});
    this.types.push({label: "Evénement", value: 'events'});
    this.types.push({label: "Trombi", value: 'trombi'});

    PHOTO_WIDTHS.map(v=>{
      this.photoWidths.push(v);
    });

    this.feedForm = builder.group({

      author: new FormControl('', []),
      content: new FormControl('', []),
      creationDate: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      top: new FormControl('', [Validators.required]),
      photo: new FormControl('', []),
      imageWidth: new FormControl('', []),
      imagePosition: new FormControl('', []),
      type: new FormControl('', [Validators.required]),
      feedFile: new FormControl('', []),
      id: new FormControl('', []),
      photoEnabled:new FormControl('',[]),
    });
  }

  ngOnInit(): void {
    this.feedsService.getFeeds().subscribe(feeds => this.feeds = feeds);

    this.fr = FRENCH_CALENDAR;
  }

  showDialogToAdd() {
    this.newFeed = true;
    this.displayDialog = true;
    this.feedFile = new File([""], "");
    this.feedForm.reset();

    this.feedForm.controls['type'].setValue('actus');
    this.feedForm.controls['top'].setValue('0');
    this.feedForm.controls['imagePosition'].setValue('left');
    this.feedForm.controls['imageWidth'].setValue('128');
    this.feedForm.controls['photoEnabled'].setValue(false);

  }

  delete() {

    this.feeds.splice(this.findSelectedFeedIndex(), 1);
    this.feedsService.deleteFeed(this.selectedFeed.id);
    this.feed = null;
    this.displayDialog = false;
  }

  onSubmit() {

    if (this.feedForm.valid) {

      if (this.feedForm.value.id) {

        this.newFeed = false;
      } else {
        this.newFeed = true;
      }

      this.feedsService.createFeed(this.feedForm.value, this.feedFile)
        .subscribe(feed => {
          this.feed = feed;
          if (this.newFeed === true) {
            this.feeds.push(this.feed);
          }
          else {
            this.feeds[this.findSelectedFeedIndex()] = this.feed;
          }
          this.feed = null;
          this.displayDialog = false;
        });
    }
  }

  onRowSelect(event) {

    this.newFeed = false;
    this.feedFile = new File([""], "");
    this.feed = this.cloneFeed(event.data);
    this.displayDialog = true;

    this.feedForm.controls['title'].setValue(this.feed.title);
    this.feedForm.controls['content'].setValue(this.feed.content);
    this.feedForm.controls['creationDate'].setValue(new Date(this.feed.creationDate));
    this.feedForm.controls['author'].setValue(this.feed.author);
    this.feedForm.controls['type'].setValue(this.feed.type);
    this.feedForm.controls['top'].setValue(this.feed.top);
    this.feedForm.controls['imagePosition'].setValue(this.feed.imagePosition);
    this.feedForm.controls['imageWidth'].setValue(this.feed.imageWidth);
    this.feedForm.controls['id'].setValue(this.feed.id);
    this.feedForm.controls['photoEnabled'].setValue(this.feed.photoEnabled);

  }

  cloneFeed(n: Feed): Feed {
    let ne = new Feed();
    for (let prop in n) {
      ne[prop] = n[prop];
    }
    return ne;
  }

  findSelectedFeedIndex(): number {
    return this.feeds.indexOf(this.selectedFeed);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.feedFile = fileList[0];
    // TODO
    // this.feedForm.controls['photo'].updateValueAndValidity(this.feedFile);
  }

}

