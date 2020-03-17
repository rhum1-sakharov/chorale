"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var FeedsService = (function () {
    function FeedsService(http) {
        this.http = http;
    }
    FeedsService.prototype.getFeeds = function () {
        var url = 'rest/feeds?sort=top,desc';
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json()._embedded.feeds;
        })
            .catch(this.handleError);
    };
    FeedsService.prototype.getFeedsByType = function (type) {
        var url = 'rest/feeds/search/types?type=' + type + '&sort=top,desc&sort=creationDate,desc';
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json()._embedded.feeds;
        })
            .catch(this.handleError);
    };
    FeedsService.prototype.createFeed = function (feed, feedFile) {
        var formData = new FormData();
        formData.append('myFile', feedFile, feedFile.name);
        formData.append('title', feed.title);
        formData.append('content', feed.content);
        formData.append('creationDate', feed.creationDate.getTime());
        formData.append('author', feed.author);
        formData.append('type', feed.type);
        formData.append('top', feed.top);
        formData.append('imagePosition', feed.imagePosition);
        formData.append('imageWidth', feed.imageWidth);
        formData.append('id', feed.id);
        var headers = new http_1.Headers();
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        var url = 'rest/feeds/add';
        return this.http.post(url, formData, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); })
            .map(function (news) {
            return news;
        }).toPromise();
    };
    FeedsService.prototype.deleteFeed = function (id) {
        var idLet = id;
        return this.http.delete('rest/feeds/delete/' + id)
            .catch(function (error) { return Observable_1.Observable.throw(error); })
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.log(error); });
    };
    FeedsService.prototype.handleError = function (error) {
        console.log('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return FeedsService;
}());
FeedsService = __decorate([
    core_1.Injectable()
], FeedsService);
exports.FeedsService = FeedsService;
