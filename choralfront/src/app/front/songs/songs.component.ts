import {Component, OnInit, HostBinding, AfterViewInit} from "@angular/core";
import {Router, ActivatedRoute, Route} from "@angular/router";
import {SongsService} from "../../services/songs/songs.service";
import {Song} from "../../services/songs/song";
import { saveAs } from 'file-saver';
// import {slideInDownAnimation} from "../../animations";
import any = jasmine.any;
import {UtilService} from "../../services/utils/util.service";
import {Title} from "@angular/platform-browser";

@Component({

  selector: 'app-songs',
  providers: [SongsService],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less'],
  // animations: [slideInDownAnimation]
})
export class SongsComponent implements OnInit,AfterViewInit {


  @HostBinding('style.display') display = 'block';

  songs: Song[];

  selectedSong:Song;
  title: string;
  routeData: any;

  cols:any[]=[
    {field:'title',header:'Titres'},
    {field:'compositor',header:'Compositeurs'},
    {field:'extension',header:'Extensions'}
    ];

  constructor(private router: Router,public utils:UtilService, private route: ActivatedRoute, private songsService: SongsService, private titleSvc:Title) {
  }

  ngOnInit() {
    this.songsService.getSongs().subscribe(songs => this.songs = songs);
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
      this.titleSvc.setTitle('La chorale gourmande - chansons');
    });
  }

  download(song: Song) {

    window.location.href = 'api/songs/getfile/' + song.extension + '/' + song.id;
  }

  getSong($event: any) {
    this.songsService.getSong(this.selectedSong).subscribe(response=>{
      var blob = new Blob([response], {type:`application/${this.selectedSong.extension}`});
      saveAs(blob, `${this.selectedSong.title}.${this.selectedSong.extension}`);
    });
  }

  ngAfterViewInit(): void {
    this.utils.activeRouteUrl=this.router.url;


  }
}
