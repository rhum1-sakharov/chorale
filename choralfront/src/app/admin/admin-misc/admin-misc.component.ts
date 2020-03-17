import {Component, OnInit} from '@angular/core';
import {SongsService} from "../../services/songs/songs.service";
import {Song} from "../../services/songs/song";
import {SelectItem} from "primeng/components/common/api";

@Component({
  selector: 'app-admin-misc',
  templateUrl: './admin-misc.component.html',
  styleUrls: ['./admin-misc.component.less'],
  providers: [SongsService]
})
export class AdminMiscComponent implements OnInit {

  mp3s: SelectItem[];
  selectedMP3: string;
  songs: Song[];

  constructor(private songsService: SongsService) {
  }

  ngOnInit() {
    this.songsService.getSongsByExtension('mp3').subscribe(songs => {
      this.mp3s = [];
      for (let s in songs) {
        this.mp3s.push({label: songs[s].title, value: songs[s].id});
      }
    });
  }

}
