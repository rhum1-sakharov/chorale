"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var songs_service_1 = require("../../services/songs/songs.service");
var SongsComponent = (function () {
    function SongsComponent(router, songsService) {
        this.router = router;
        this.songsService = songsService;
    }
    SongsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.songsService.getSongs().then(function (songs) { return _this.songs = songs; });
    };
    SongsComponent.prototype.download = function (song) {
        window.location.href = 'rest/songs/getfile/' + song.extension + '/' + song.id;
    };
    return SongsComponent;
}());
SongsComponent = __decorate([
    core_1.Component({
        moduleId: '5',
        selector: 'app-songs',
        providers: [songs_service_1.SongsService],
        templateUrl: './songs.component.html',
        styleUrls: ['./songs.component.less']
    })
], SongsComponent);
exports.SongsComponent = SongsComponent;
