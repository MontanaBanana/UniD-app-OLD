webpackJsonp([1],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__component_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ProjectPage = /** @class */ (function () {
    function ProjectPage(navCtrl, http, modalCtrl, geolocation, navParams, sanitizer, loadingCtrl, keyboard) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.loadingCtrl = loadingCtrl;
        this.keyboard = keyboard;
        this.isSearching = false;
        this.notCached = false;
        this.searchQuery = '';
        this.src = 'Connect to the internet to download content.';
        this.id = navParams.get("id");
        this.title = navParams.get("title");
        this.viewType = 'text';
        this.presentLoading();
        this.initializeItems();
        this.addDurations();
        this.watch = this.geolocation.watchPosition();
        this.watch.subscribe(function (data) {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
            if (_this.sections1) {
                for (var i = 0; i < _this.sections1.length; i++) {
                    var comp = _this.sections1[i];
                    var dist = _this.distance(data.coords.latitude, data.coords.longitude, comp.latitude, comp.longitude, 'K') * 1000;
                    if (dist <= comp.gps_range) {
                        _this.showComponentModal(comp);
                    }
                }
            }
        });
    }
    ProjectPage.prototype.scrollTop = function () {
        this.content.scrollToTop(400);
        document.getElementById("project_header").focus();
    };
    ProjectPage.prototype.ionViewDidEnter = function () {
        var title_bar = document.getElementById("project-title");
        var project_content = document.getElementById("project-body").getElementsByClassName("scroll-content")[0];
        console.log('clientHeight');
        console.log(title_bar.clientHeight);
        if (title_bar.clientHeight < 40) {
            project_content.style.marginTop = "54px";
        }
        else {
            project_content.style.marginTop = (+title_bar.clientHeight + 6) + "px";
        }
    };
    ProjectPage.prototype.onlyPlayOneIn = function (container) {
        container.addEventListener("play", function (event) {
            var audio_elements = container.getElementsByTagName("audio");
            for (var i = 0; i < audio_elements.length; i++) {
                var audio_element = audio_elements[i];
                if (audio_element !== event.target) {
                    audio_element.pause();
                }
            }
        }, true);
    };
    ProjectPage.prototype.closeKeyboard = function () {
        this.keyboard.close();
        document.getElementById("searchResultHeader").focus();
    };
    ProjectPage.prototype.initializeItems = function () {
        var _this = this;
        if (!this.cached_project) {
            var project = this.http.get('https://unidescription.org/account/project/export_jsonv2/' + this.id);
            project
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                //alert(data);
                _this.notCached = false;
                window.localStorage.setItem(_this.id, JSON.stringify(data.project));
                _this.cached_project = data.project;
                _this.project = data.project;
                _this.sections1 = data.project.project_sections;
                _this.sections2 = data.project.project_sections;
                _this.sections3 = data.project.project_sections;
                console.log(_this.project);
                //this.src = this.sanitizer.bypassSecurityTrustHtml(data.html);
                //console.log('my data: ', data);
                _this.loader.dismissAll();
                _this.onlyPlayOneIn(document.body);
            }, function (err) {
                //alert(data);
                try {
                    _this.cached_project = JSON.parse(window.localStorage.getItem(_this.id));
                    _this.sections1 = _this.cached_project.project_sections;
                    _this.sections2 = _this.cached_project.project_sections;
                    _this.sections3 = _this.cached_project.project_sections;
                    if (_this.cached_project.id > 0) {
                        _this.project = project;
                        _this.notCached = false;
                    }
                    else {
                        //this.src = "Ensure you are connected to the internet to download content.";
                        _this.notCached = true;
                    }
                    console.log(_this.project);
                }
                catch (e) {
                    _this.notCached = true;
                }
                _this.loader.dismissAll();
                _this.onlyPlayOneIn(document.body);
            });
        }
        else {
            this.sections1 = this.cached_project.project_sections;
            this.sections2 = this.cached_project.project_sections;
            this.sections3 = this.cached_project.project_sections;
        }
    };
    ProjectPage.prototype.showComponentModal = function (data) {
        var modal = this.modalCtrl.create({
            component: __WEBPACK_IMPORTED_MODULE_6__component_component__["a" /* ComponentPage */],
            componentProps: {
                component: data
            }
        });
        //modal.fireOtherLifecycles = false;
        modal.present();
    };
    //:::  This routine calculates the distance between two points (given the     :::
    //:::  latitude/longitude of those points). It is being used to calculate     :::
    //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
    //:::                                                                         :::
    //:::  Definitions:                                                           :::
    //:::    South latitudes are negative, east longitudes are positive           :::
    //:::                                                                         :::
    //:::  Passed to function:                                                    :::
    //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
    //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
    //:::    unit = the unit you desire for results                               :::
    //:::           where: 'M' is statute miles (default)                         :::
    //:::                  'K' is kilometers                                      :::
    //:::                  'N' is nautical miles                                  :::
    //:::
    ProjectPage.prototype.distance = function (lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") {
                dist = dist * 1.609344;
            }
            if (unit == "N") {
                dist = dist * 0.8684;
            }
            return dist;
        }
    };
    ProjectPage.prototype.filterItems = function (ev) {
        return 1;
    };
    ProjectPage.prototype.addDurations = function () {
        setTimeout(function () {
            console.log('in addDurations');
            var audiofiles = document.getElementsByClassName("audiofiles");
            console.log(audiofiles);
            var duration_total = 0;
            for (var i = 0; i < audiofiles.length; i++) {
                console.log(document.getElementById(audiofiles.item(i).id)["duration"]);
                console.log(audiofiles.item(i).id + "-length");
                duration_total += document.getElementById(audiofiles.item(i).id)["duration"];
                document.getElementById(audiofiles.item(i).id + "-length").innerHTML = "Duration of audio: " + document.getElementById(audiofiles.item(i).id)["duration"] + " seconds";
            }
            console.log('duration_total');
            console.log(duration_total);
            var date = new Date(null);
            date.setSeconds(duration_total);
            var utc = date.toUTCString();
            // // retrieve each value individually - returns h:m:s
            //var time = date.getUTCHours() + ':' + date.getUTCMinutes() + ':' +  date.getUTCSeconds();
            //var time = date.toISOString().substr(11, 8);
            var string_time = '';
            if (date.getUTCHours() > 0) {
                string_time += date.getUTCHours() + ' hour';
                if (date.getUTCHours() > 1) {
                    string_time += 's';
                }
                string_time += ', ';
            }
            if (date.getUTCMinutes() > 0) {
                string_time += date.getUTCMinutes() + ' minute';
                if (date.getUTCMinutes() > 1) {
                    string_time += 's';
                }
                string_time += ', ';
            }
            if (date.getUTCSeconds() > 0) {
                string_time += date.getUTCSeconds() + ' second';
                if (date.getUTCSeconds() > 1) {
                    string_time += 's';
                }
            }
            var ele = document.getElementById("duration");
            if (ele) {
                document.getElementById("duration").textContent = string_time.replace(/, $/, '');
            }
        }, 12500);
    };
    ProjectPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Loading brochure...",
        });
        this.loader.present();
    };
    ProjectPage.prototype.stripEndBreaks = function (text) {
        return text.replace(/(<br>\s*)+$/, '');
    };
    ProjectPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        this.search_text = val;
        //console.log('val: ' + val);
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.isSearching = true;
            this.sections3 = this.sections3.filter(function (item) {
                item.title.replace("<strong>", "");
                item.title.replace("</strong>", "");
                item.title.replace(val, "<strong>" + val + "</strong>");
                if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    return true;
                }
                if (item.description != null) {
                    return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
                return false;
            });
            this.sections2 = this.sections2.filter(function (item) {
                item.title.replace("<strong>", "");
                item.title.replace("</strong>", "");
                item.title.replace(val, "<strong>" + val + "</strong>");
                if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    return true;
                }
                if (item.description != null) {
                    return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
                return false;
            });
            this.sections1 = this.sections1.filter(function (item) {
                item.title.replace("<strong>", "");
                item.title.replace("</strong>", "");
                item.title.replace(val, "<strong>" + val + "</strong>");
                if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
                    //console.log('matched title ' + item.title);
                    return true;
                }
                if (item.description != null) {
                    return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
                return false;
            });
            this.search_results_count = this.sections1.length;
        }
        else {
            this.isSearching = false;
            this.sections3 = this.sections3.filter(function (item) {
                item.title.replace("<strong>", "");
                item.title.replace("</strong>", "");
                item.title.replace(val, "<strong>" + val + "</strong>");
                return true;
            });
            this.sections2 = this.sections2.filter(function (item) {
                item.title.replace("<strong>", "");
                item.title.replace("</strong>", "");
                item.title.replace(val, "<strong>" + val + "</strong>");
                return true;
            });
            this.sections1 = this.sections1.filter(function (item) {
                item.title.replace("<strong>", "");
                item.title.replace("</strong>", "");
                item.title.replace(val, "<strong>" + val + "</strong>");
                return true;
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Content */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* Content */]) === "function" && _a || Object)
    ], ProjectPage.prototype, "content", void 0);
    ProjectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-project',template:/*ion-inline-start:"c:\Users\joseph\Development\UniD-app\src\pages\project\project.html"*/'<ion-header>\n  <ion-navbar id="project-navbar">\n    <ion-title id="project-title">\n      {{ this.title }}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content scroll="true" id="project-body">\n\n  <ion-segment [(ngModel)]="viewType" (ionChange)="addDurations()">\n    <ion-segment-button value="text">\n      Text Only\n    </ion-segment-button>\n    <ion-segment-button value="audio">\n      Audio Only\n    </ion-segment-button>\n    <ion-segment-button value="text_audio">\n      Text and Audio\n    </ion-segment-button>\n  </ion-segment>\n  <ion-searchbar (input)="getItems($event)" (search)="closeKeyboard()"></ion-searchbar>\n  <h2 id="searchResultHeader" tabindex="-1" style="text-align: center; margin-top: 1rem;" *ngIf="isSearching"><span [(innerHTML)]="search_results_count"></span> results for <span [(innerHTML)]="search_text"></span></h2>\n\n<section *ngIf="!project" padding>\n    <p>Attempting to connect...</p>\n    <section *ngIf="notCached" padding>\n        <p>Cannot download brochure. Please connect to the Internet.</p>\n        <p>You can view previously downloaded brochures if you are offline.</p>\n    </section>\n</section>\n\n<section *ngIf="project">\n\n    <!--<h1 id="project_header" tabindex="-1" style="padding: 0 3% 0 3%;">{{project.title}}</h1>-->\n    <h1 id="project_header" tabindex="-1" style="padding: 0 3% 0 3%;">Table of Contents</h1>\n	\n	<p style="padding: 0 3% 0 3%;">Audio Available: <span id="duration">loading...</span></p>\n\n    <nav *ngIf="isSearching">\n        <ul>\n            <ng-container *ngFor="let component of sections1">\n              <li *ngIf="component.completed && !component.deleted">\n                <a href="#{{component.id}}">{{component.title}}</a>\n              </li>\n            </ng-container>\n        </ul>\n\n    </nav>\n\n    <nav *ngIf="!isSearching">\n        <ul>\n            <ng-container *ngFor="let component of sections1">\n              <li *ngIf="component.completed && !component.deleted && component.project_section_id == 0">\n                <a href="#{{component.id}}">{{component.title}}</a>\n                <ul>\n                    <ng-container *ngFor="let comp2 of sections2">\n                      <li *ngIf="comp2.project_section_id == component.id && comp2.completed && !comp2.deleted">\n                        <a href="#{{comp2.id}}">{{comp2.title}}</a>\n                        <ul>\n                          <ng-container *ngFor="let comp3 of sections3">\n                            <li *ngIf="comp3.project_section_id == comp2.id && comp3.completed && !comp3.deleted">\n                                <a href="#comp3.id">{{comp3.title}}</a>\n                            </li>\n                          </ng-container>\n                        </ul>\n                      </li>\n                    </ng-container>\n                </ul>\n              </li>\n            </ng-container>\n        </ul>\n    </nav>\n\n    <div [ngSwitch]="viewType">\n\n        <ion-list *ngSwitchCase="\'text\'">\n\n          <ng-container *ngFor="let component of sections3">\n              <ion-item text-wrap *ngIf="component.completed && !component.deleted" style="padding-left: 6%; padding-right: 6%;">\n                  <a tabindex="-1" name="{{ component.id }}"><h2>{{ component.title }}</h2></a>\n                  <p [(innerHTML)]="component.description"></p>\n                  <p style="display: none;" id="audio-{{ component.id }}-length">Duration of audio: loading...</p>\n				  <ion-item *ngIf="component.image_url && component.has_image_rights">\n					<div class="frame" style="height: 220px; width: 100%; border: 1px solid gray; white-space: nowrap; text-align: center; margin: 1em 0; background-color: black;">\n						<span class="helper" style="display: inline-block; height: 100%; vertical-align: middle;"></span>\n						<img src="https://www.unidescription.org/{{ component.image_url }}" style="background: #3A6F9A; vertical-align: middle; max-height: 210px; max-width: 100%;" />\n					</div>\n				  </ion-item>\n				  <audio class="audiofiles" id="audio-{{ component.id }}" preload="auto" controls style="display: none;">\n                      <source src="{{ component.audio_file_combined }}" type="audio/mpeg">\n                  </audio>\n                  <button ion-button small (click)="scrollTop()">&uarr; back to top</button>\n              </ion-item>\n          </ng-container>\n\n        </ion-list>\n\n        <ion-list *ngSwitchCase="\'audio\'">\n\n          <ng-container *ngFor="let component of sections3">\n              <ion-item text-wrap *ngIf="component.completed && !component.deleted" style="padding-left: 6%; padding-right: 6%;">\n                  <a tabindex="-1" name="{{ component.id }}"><h2>{{ component.title }}</h2></a>\n                  <p id="audio-{{ component.id }}-length">Duration of audio: loading...</p>\n				  <ion-item *ngIf="component.image_url && component.has_image_rights">\n					<div class="frame" style="height: 220px; width: 100%; border: 1px solid gray; white-space: nowrap; text-align: center; margin: 1em 0; background-color: black;">\n						<span class="helper" style="display: inline-block; height: 100%; vertical-align: middle;"></span>\n						<img src="https://www.unidescription.org/{{ component.image_url }}" style="background: #3A6F9A; vertical-align: middle; max-height: 210px; max-width: 100%;" />\n					</div>\n				  </ion-item>\n                  <audio class="audiofiles" id="audio-{{ component.id }}" preload="auto" controls>\n                      <source src="{{ component.audio_file_combined }}" type="audio/mpeg">\n                  </audio>\n                  <br /><button ion-button small (click)="scrollTop()">&uarr; back to top</button>\n              </ion-item>\n          </ng-container>\n\n        </ion-list>\n\n        <ion-list *ngSwitchCase="\'text_audio\'">\n\n          <ng-container *ngFor="let component of sections3">\n              <ion-item text-wrap *ngIf="component.completed && !component.deleted" style="padding-left: 6%; padding-right: 6%;">\n                  <a tabindex="-1" name="{{ component.id }}"><h2>{{ component.title }}</h2></a>\n                  <p [(innerHTML)]="component.description"></p>\n                  <p id="audio-{{ component.id }}-length">Duration of audio: loading...</p>\n				  <ion-item *ngIf="component.image_url && component.has_image_rights">\n					<div class="frame" style="height: 220px; width: 100%; border: 1px solid gray; white-space: nowrap; text-align: center; margin: 1em 0; background-color: black;">\n						<span class="helper" style="display: inline-block; height: 100%; vertical-align: middle;"></span>\n						<img src="https://www.unidescription.org/{{ component.image_url }}" style="background: #3A6F9A; vertical-align: middle; max-height: 210px; max-width: 100%;" />\n					</div>\n				  </ion-item>\n                  <audio class="audiofiles" id="audio-{{ component.id }}" preload="auto" controls>\n                      <source src="{{ component.audio_file_combined }}" type="audio/mpeg">\n                  </audio>\n                  <br /><button ion-button small (click)="scrollTop()">&uarr; back to top</button>\n              </ion-item>\n          </ng-container>\n\n        </ion-list>\n\n    </div>\n\n</section>\n\n</ion-content>\n\n<ion-footer>\n\n</ion-footer>\n\n'/*ion-inline-end:"c:\Users\joseph\Development\UniD-app\src\pages\project\project.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */]) === "function" && _j || Object])
    ], ProjectPage);
    return ProjectPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());

//# sourceMappingURL=project.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__project_project__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var IntroPage = /** @class */ (function () {
    function IntroPage(navCtrl, http, viewCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.viewCtrl = viewCtrl;
    }
    IntroPage.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    IntroPage.prototype.goToAboutUs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__project_project__["a" /* ProjectPage */], {
            id: 281,
            title: 'About Us - The UniDescription Project'
        });
    };
    IntroPage.prototype.goToFaq = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__project_project__["a" /* ProjectPage */], {
            id: 580,
            title: 'FAQ'
        });
    };
    IntroPage.prototype.goToHowTo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__project_project__["a" /* ProjectPage */], {
            id: 581,
            title: 'How to Use This App'
        });
    };
    IntroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-intro',template:/*ion-inline-start:"c:\Users\joseph\Development\UniD-app\src\pages\intro\intro.html"*/'<div style="background: url(statue.jpg) no-repeat; background-position: center top; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; height: 100%; width: 100%; text-align: center;" (click)="dismissModal()">\n\n    <!-- align to the bottom of the page -->\n    <div style="position: absolute; bottom: 0px; black; color: white; text-shadow: 2px 2px #000; background-color: rgba(0, 0, 0, .6); width: 100%; padding: 5%; text-align: center;">\n      <h1 style="font-size: 1.9rem; margin-top: 0; margin-bottom: 0;">Audio Describe the World!</h1>\n      <p style="font-size: 1.4rem; margin-top: 0; margin-bottom: 0;">\n        That is the mantra of The UniDescription Project, which has begun with the translation of National Park Service brochures, including for Statue of Liberty National Monument. To hear those, just touch the screen and choose from among the dozens of brochures.\n      </p>\n	  <button ion-button full type="submit">\n          Search\n      </button>\n	  <button ion-button full type="submit">\n          All brochures\n      </button>\n	  <button ion-button full type="submit">\n          Settings\n      </button>\n	  <button ion-button full (click)="goToHowTo()">\n          How to use this app\n      </button>	  \n      <button ion-button full (click)="goToFaq()">\n          FAQ\n      </button>\n      <button ion-button full (click)="goToAboutUs()">\n          About Us\n      </button>\n    </div>\n\n</div>\n'/*ion-inline-end:"c:\Users\joseph\Development\UniD-app\src\pages\intro\intro.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["k" /* ViewController */]])
    ], IntroPage);
    return IntroPage;
}());

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ComponentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComponentPage = /** @class */ (function () {
    function ComponentPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ComponentPage.prototype.ngOnInit = function () {
    };
    ComponentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ComponentPage');
    };
    ComponentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-component',template:/*ion-inline-start:"c:\Users\joseph\Development\UniD-app\src\pages\component\component.html"*/'<!--\n  Generated template for the ComponentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n      <ion-title>{{ this.component.title }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"c:\Users\joseph\Development\UniD-app\src\pages\component\component.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ComponentPage);
    return ComponentPage;
}());

//# sourceMappingURL=component.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/component/component.module": [
		277,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 159;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__project_project__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__intro_intro__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, http, geolocation, modalCtrl, keyboard) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.keyboard = keyboard;
        this.searchQuery = '';
        this.name_items = [];
        this.cached_name_items = [];
        this.state_items = [];
        this.cached_state_items = [];
        this.type_items = [];
        this.cached_type_items = [];
        this.latitude = 0;
        this.longitude = 0;
        this.sort_by = "name";
        this.isSearching = false;
        this.initializeItems();
    }
    HomePage.prototype.ionViewWillEnter = function () {
        return;
        /*if (window.localStorage.getItem('saw_intro') == '0') {
              window.localStorage.setItem('saw_intro', '1');
              let modal = this.modalCtrl.create(IntroPage);
              //modal.fireOtherLifecycles = false;
              modal.present();
              }*/
    };
    HomePage.prototype.showIntro = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_8__intro_intro__["a" /* IntroPage */]);
        //modal.fireOtherLifecycles = false;
        modal.present();
    };
    HomePage.prototype.closeKeyboard = function () {
        this.keyboard.close();
        document.getElementById("searchResultHeader").focus();
    };
    HomePage.prototype.fetchProjects = function () {
        var _this = this;
        var projects = this.http.get('https://unidescription.org/project/npsProjects?lat=' + this.latitude + '&lon=' + this.longitude);
        //var projects = this.http.get('https://www.unidescription.org/project/npsProjectsV2');
        projects
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            window.localStorage.setItem('parklist-name', JSON.stringify(data.name));
            _this.name_items = data.name;
            window.localStorage.setItem('parklist-state', JSON.stringify(data.state));
            _this.state_items = data.state;
            window.localStorage.setItem('parklist-type', JSON.stringify(data.type));
            _this.type_items = data.type;
            window.localStorage.setItem('parklist-cached-name', JSON.stringify(data.name));
            _this.cached_name_items = data.name;
            window.localStorage.setItem('parklist-cached-state', JSON.stringify(data.state));
            _this.cached_state_items = data.state;
            window.localStorage.setItem('parklist-cached-type', JSON.stringify(data.type));
            _this.cached_type_items = data.type;
            //console.log('my data: ', data);
        }, function (err) {
            _this.name_items = JSON.parse(window.localStorage.getItem('parklist-name'));
            _this.state_items = JSON.parse(window.localStorage.getItem('parklist-state'));
            _this.type_items = JSON.parse(window.localStorage.getItem('parklist-type'));
            _this.cached_name_items = JSON.parse(window.localStorage.getItem('parklist-cached-name'));
            _this.cached_state_items = JSON.parse(window.localStorage.getItem('parklist-cached-state'));
            _this.cached_type_items = JSON.parse(window.localStorage.getItem('parklist-cached-type'));
        });
    };
    HomePage.prototype.initializeItems = function () {
        var _this = this;
        if (!this.cached_name_items.length) {
            this.geolocation.getCurrentPosition().then(function (res) {
                _this.latitude = res.coords.latitude;
                _this.longitude = res.coords.longitude;
                console.log(_this.latitude);
                console.log(_this.longitude);
                _this.fetchProjects();
            }).catch(function (error) {
                _this.fetchProjects();
            });
        }
        else {
            this.name_items = this.cached_name_items;
            this.state_items = this.cached_state_items;
            this.type_items = this.cached_type_items;
        }
    };
    HomePage.prototype.goToAboutUs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__project_project__["a" /* ProjectPage */], {
            id: 281,
            title: 'About Us - The UniDescription Project'
        });
    };
    HomePage.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__project_project__["a" /* ProjectPage */], {
            id: item.id,
            title: item.title
        });
        //console.log(item);
    };
    HomePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        this.search_text = val;
        //console.log('val: ' + val);
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.isSearching = true;
            this.name_items = this.name_items.filter(function (item) {
                //console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            this.state_items = this.state_items.filter(function (item) {
                //console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            this.type_items = this.type_items.filter(function (item) {
                //console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            this.search_results_count = this.type_items.length;
        }
        else {
            this.isSearching = false;
        }
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"c:\Users\joseph\Development\UniD-app\src\pages\home\home.html"*/'<ion-content>\n   <div style="text-align: center;"> \n      <img src="nps-logo.png" alt="National Park Service logo" (click)="showIntro()" width="61" style="position: relative; top: -9px; float: left; margin-left: 15px;" />\n      <h3>National Park Service brochures</h3>\n   </div>\n	<ion-segment [(ngModel)]="sort_by">\n      <ion-segment-button value="name">\n        By Name\n      </ion-segment-button>\n	  <ion-segment-button value="state">\n        By State\n      </ion-segment-button>\n      <!--<ion-segment-button value="type">\n        By Type\n      </ion-segment-button>-->\n    </ion-segment>\n   <ion-searchbar (ionInput)="getItems($event)" (search)="closeKeyboard()"></ion-searchbar>\n   <h2 id="searchResultHeader" tabindex="-1" style="text-align: center; margin-top: 1rem;" *ngIf="isSearching"><span [(innerHTML)]="search_results_count"></span> results for <span [(innerHTML)]="search_text"></span></h2>\n\n<div [ngSwitch]="sort_by">\n\n  <ion-list *ngSwitchCase="\'name\'">\n	  <button ion-item text-wrap *ngFor="let item of name_items" (click)="itemSelected(item)">\n		{{ item.title }}\n	  </button>\n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'state\'">\n	  <button ion-item text-wrap *ngFor="let item of state_items" (click)="itemSelected(item)">\n		{{ item.title }}\n	  </button>\n  </ion-list>\n  \n  <ion-list *ngSwitchCase="\'type\'">\n	  <button ion-item text-wrap *ngFor="let item of type_items" (click)="itemSelected(item)">\n		{{ item.title }}\n	  </button>\n  </ion-list>\n</div>	\n	\n\n</ion-content>\n'/*ion-inline-end:"c:\Users\joseph\Development\UniD-app\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__["a" /* Keyboard */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(226);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_project_project__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_intro_intro__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_component_component__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_safe__ = __webpack_require__(276);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';








var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_project_project__["a" /* ProjectPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_intro_intro__["a" /* IntroPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_component_component__["a" /* ComponentPage */],
                __WEBPACK_IMPORTED_MODULE_13__pipes_safe__["a" /* SafePipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/component/component.module#ComponentPageModule', name: 'ComponentPage', segment: 'component', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_project_project__["a" /* ProjectPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_component_component__["a" /* ComponentPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_intro_intro__["a" /* IntroPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_intro_intro__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { TranslateService } from '@ngx-translate/core';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            window.localStorage.setItem('saw_intro', '0');
            if (window.localStorage.getItem('saw_intro') == '0') {
                window.localStorage.setItem('saw_intro', '1');
                var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_intro_intro__["a" /* IntroPage */]);
                //modal.fireOtherLifecycles = false;
                modal.present();
            }
            //translate.setDefaultLang('en');
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            //splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"c:\Users\joseph\Development\UniD-app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"c:\Users\joseph\Development\UniD-app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SafePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SafePipe = /** @class */ (function () {
    function SafePipe(_sanitizer) {
        this._sanitizer = _sanitizer;
    }
    SafePipe.prototype.transform = function (value, type) {
        switch (type) {
            case 'html':
                return this._sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this._sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this._sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this._sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                throw new Error("Unable to bypass security for invalid type: " + type);
        }
    };
    SafePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'safe'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]])
    ], SafePipe);
    return SafePipe;
}());

//# sourceMappingURL=safe.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map