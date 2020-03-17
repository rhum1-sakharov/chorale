import {Component, OnInit, HostBinding} from "@angular/core";
import {Router, ActivatedRoute, Route} from "@angular/router";
import {SongsService} from "../../services/songs/songs.service";
import {Song} from "../../services/songs/song";
import {slideInDownAnimation} from "../../animations";
import any = jasmine.any;

@Component({

  selector: 'app-songs',
  providers: [SongsService],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.less'],
  animations: [slideInDownAnimation]
})
export class SongsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  songs: Song[];

  title: string;
  routeData: any;

  constructor(private router: Router, private route: ActivatedRoute, private songsService: SongsService) {
  }

  ngOnInit() {
    this.songsService.getSongs().then(songs => this.songs = songs);
    this.route.data.subscribe(data => {
      this.routeData = data;
      this.title = this.routeData.title;
    });
  }

  download(song: Song) {

    window.location.href = 'api/songs/getfile/' + song.extension + '/' + song.id;
  }

}
