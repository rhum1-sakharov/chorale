import {Component, OnInit} from '@angular/core';
import {SongsService} from "../../services/songs/songs.service";
import {Song} from "../../services/songs/song";
import {FormControl, FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {FRENCH_CALENDAR, MSG_KEY, MSG_SEVERITY} from "../../constants";
import {finalize} from "rxjs/operators";
import {UtilService} from "../../services/utils/util.service";

@Component({

  selector: 'app-admin-songs',
  providers: [SongsService],
  templateUrl: './admin-songs.component.html',
  styleUrls: ['./admin-songs.component.less']
})
export class AdminSongsComponent implements OnInit {

  //todo fichiers accpets : jpg, pdf, doc, nwc

  songs: Song[];
  song: Song;
  songFile: File;
  newSong: boolean;
  displayDialog: boolean = false;
  selectedSong: Song;
  fr: any;

  //input of form song
  songForm: FormGroup;
  title: FormControl;
  band: FormControl;
  compositor: FormControl;
  nwcFile: FormControl;
  releaseDate: FormControl;

  cols: any[] = [
    {header: 'title', field: 'Titre'},
    {header: 'compositor', field: 'Compositeur'},
    {header: 'releaseDate', field: 'Date'},
    {header: 'id', field: '%Id'},
  ];

  constructor(private router: Router, public utils: UtilService, private builder: FormBuilder, private songsService: SongsService) {

    this.title = new FormControl('', [Validators.required]);
    this.band = new FormControl('', []);
    this.compositor = new FormControl('', [Validators.required]);
    this.nwcFile = new FormControl('', []);

    this.songForm = builder.group({
      title: this.title,
      band: this.band,
      compositor: this.compositor,
      nwcFile: this.nwcFile,
      id: new FormControl('', []),
      releaseDate: new FormControl('', [])
    });
  }


  ngOnInit(): void {
    this.songsService.getSongs().subscribe(songs => this.songs = songs);

    this.fr = FRENCH_CALENDAR;
  }

  onSubmit() {

    if (this.songForm.valid) {

      this.utils.loading = true;

      if (this.songForm.value.id) {
        this.newSong = false;
      } else {
        this.newSong = true;
      }

      this.songsService.createSong(this.songForm.value, this.songFile).pipe(
        finalize(() => this.utils.loading = false)
      )
        .subscribe(song => {
          this.song = song;
          if (this.newSong === true) {
            this.songs.push(this.song);
          }
          else {
            this.songs[this.findSelectedSongIndex()] = this.song;
          }

          this.displayDialog = false;
          this.utils.showMsg(MSG_KEY.ROOT, MSG_SEVERITY.SUCCESS, `Chanson '${this.song.title}' enregistrée`);
        });
    }
  }

  delete() {
    this.songs.splice(this.findSelectedSongIndex(), 1);
    this.songsService.deleteSong(this.selectedSong.id).pipe(
      finalize(() => this.utils.loading = false)
    ).subscribe(response=>{

      this.utils.showMsg(MSG_KEY.ROOT, MSG_SEVERITY.SUCCESS, `Chanson '${this.song.title}' supprimée`);
      this.song = null;
      this.displayDialog = false;
    });

  }

  showDialogToAdd() {
    this.newSong = true;
    this.displayDialog = true;
    this.songFile = new File([""], "");
    this.songForm.reset();
  }

  onRowSelect(event) {

    this.newSong = false;
    this.songFile = new File([""], "");

    this.song = this.cloneSong(this.selectedSong);


    this.displayDialog = true;
    this.songForm.controls['title'].setValue(this.song.title);
    this.songForm.controls['compositor'].setValue(this.song.compositor);
    this.songForm.controls['band'].setValue(this.song.band);
    this.songForm.controls['releaseDate'].setValue(new Date(this.song.releaseDate));
    this.songForm.controls['id'].setValue(this.song.id);

  }

  cloneSong(s: Song): Song {
    let song = new Song();
    for (let prop in s) {
      song[prop] = s[prop];
    }
    return song;
  }

  findSelectedSongIndex(): number {
    return this.songs.indexOf(this.selectedSong);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.songFile = fileList[0];


    this.songForm.controls['nwcFile'].setValue(this.songFile);
  }


}
