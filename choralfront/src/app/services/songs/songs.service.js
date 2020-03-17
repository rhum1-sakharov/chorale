"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var SongsService = (function () {
    function SongsService(http) {
        this.http = http;
    }
    SongsService.prototype.getSongs = function () {
        var url = 'rest/songs?sort=releaseDate,desc';
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json()._embedded.songs;
        })
            .catch(this.handleError);
    };
    SongsService.prototype.deleteSong = function (id) {
        var idLet = id;
        return this.http.delete('rest/songs/delete/' + id)
            .catch(function (error) { return Observable_1.Observable.throw(error); })
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    SongsService.prototype.createSong = function (song, songFile) {
        var formData = new FormData();
        formData.append('myFile', songFile, songFile.name);
        formData.append('compositor', song.compositor);
        formData.append('title', song.title);
        formData.append('band', song.band);
        formData.append('releaseDate', song.releaseDate.getTime());
        formData.append('id', song.id);
        var headers = new http_1.Headers();
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        var url = 'rest/songs/add';
        return this.http.post(url, formData, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); })
            .map(function (song) {
            return song;
        }).toPromise();
    };
    SongsService.prototype.handleError = function (error) {
        console.log('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return SongsService;
}());
SongsService = __decorate([
    core_1.Injectable()
], SongsService);
exports.SongsService = SongsService;
