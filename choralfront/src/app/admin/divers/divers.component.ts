import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {DiversService} from "../../services/divers/divers.service";

import {NG_THEMES} from "../../constants";
import {SelectItem} from "primeng";
import {finalize} from "rxjs/operators";
import {UtilService} from "../../services/utils/util.service";

@Component({
  selector: 'app-divers',
  providers: [DiversService],
  templateUrl: './divers.component.html',
  styleUrls: ['./divers.component.less']
})
export class DiversComponent implements OnInit {

  cssForm: FormGroup;
  bgFile: File;
  audioFile:File;
  audioEnabled:boolean = false;

  themes: SelectItem[] = [];

  constructor(private router: Router,public utils:UtilService, private builder: FormBuilder, private diversService: DiversService) {
    NG_THEMES.map(v => {
      this.themes.push(v);
    });

    this.cssForm = builder.group({
      bgPhoto: new FormControl('', []),
      themes: new FormControl('', []),
      audioFile:new FormControl('', []),
      audioEnabled:new FormControl('', [])
    });

  }

  ngOnInit() {
    this.diversService.isAudioEnabled().subscribe((config:any) => {
      this.audioEnabled = config.value === 'true' ? true : false;
      this.cssForm.controls['audioEnabled'].setValue(this.audioEnabled);
    });
  }

  onSubmit() {

    if (this.cssForm.valid) {

      this.utils.loading=true;

      this.diversService.savePreferences(this.bgFile,this.audioFile, this.cssForm.value.themes, this.cssForm.value.audioEnabled)
        .pipe(
          finalize(()=>this.utils.loading=false)
        )
        .subscribe(res => {
          // console.log('saved css');
          window.location.reload();
        });
    }
  }

  fileChangeBg(event) {
    let fileList: FileList = event.target.files;
    this.bgFile = fileList[0];

    // TODO
    // this.cssForm.controls['bgPhoto'].updateValueAndValidity(this.bgFile);
  }

  fileChangeAudio(event) {
    let fileList: FileList = event.target.files;
    this.audioFile = fileList[0];

    // TODO
    // this.cssForm.controls['audioFile'].updateValueAndValidity(this.audioFile);
  }

}
