"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var feeds_service_1 = require("../../services/feeds/feeds.service");
var NewsComponent = (function () {
    function NewsComponent(router, feedService) {
        this.router = router;
        this.feedService = feedService;
    }
    NewsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.feedService.getFeedsByType('actus').then(function (feeds) { return _this.feeds = feeds; });
    };
    return NewsComponent;
}());
NewsComponent = __decorate([
    core_1.Component({
        moduleId: '2',
        selector: 'app-news',
        providers: [feeds_service_1.FeedsService],
        templateUrl: './news.component.html',
        styleUrls: ['./news.component.less']
    })
], NewsComponent);
exports.NewsComponent = NewsComponent;
