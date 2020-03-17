import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DiversService} from "../../services/divers/divers.service";
import {SelectItem} from "primeng/components/common/api";
import {NG_THEMES} from "../../constants";

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

  constructor(private router: Router, private builder: FormBuilder, private diversService: DiversService) {
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
      this.diversService.savePreferences(this.bgFile,this.audioFile, this.cssForm.value.themes, this.cssForm.value.audioEnabled)
        .subscribe(res => {
          console.log('saved css');
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
