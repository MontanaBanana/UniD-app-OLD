webpackJsonp([0],{

/***/ 119:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 119;

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 161;

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__project_project__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__intro_intro__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HomePage = (function () {
    function HomePage(navCtrl, http, modalCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.searchQuery = '';
        this.name_items = [];
        this.cached_name_items = [];
        this.state_items = [];
        this.cached_state_items = [];
        this.type_items = [];
        this.cached_type_items = [];
        this.sort_by = "name";
        this.initializeItems();
    }
    HomePage.prototype.ionViewDidEnter = function () {
        if (window.localStorage.getItem('saw_intro') == '0') {
            window.localStorage.setItem('saw_intro', '1');
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__intro_intro__["a" /* IntroPage */]);
            //modal.fireOtherLifecycles = false;
            modal.present();
        }
    };
    HomePage.prototype.initializeItems = function () {
        var _this = this;
        if (!this.cached_name_items.length) {
            var projects = this.http.get('https://www.unidescription.org/project/npsProjects');
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
                console.log('my data: ', data);
            }, function (err) {
                _this.name_items = JSON.parse(window.localStorage.getItem('parklist-name'));
                _this.state_items = JSON.parse(window.localStorage.getItem('parklist-state'));
                _this.type_items = JSON.parse(window.localStorage.getItem('parklist-type'));
                _this.cached_name_items = JSON.parse(window.localStorage.getItem('parklist-cached-name'));
                _this.cached_state_items = JSON.parse(window.localStorage.getItem('parklist-cached-state'));
                _this.cached_type_items = JSON.parse(window.localStorage.getItem('parklist-cached-type'));
            });
        }
        else {
            this.name_items = this.cached_name_items;
            this.state_items = this.cached_state_items;
            this.type_items = this.cached_type_items;
        }
    };
    HomePage.prototype.itemSelected = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__project_project__["a" /* ProjectPage */], {
            id: item.id,
            title: item.title
        });
        console.log(item);
    };
    HomePage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        console.log('val: ' + val);
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.name_items = this.name_items.filter(function (item) {
                console.log(item.title.toLowerCase().indexOf(val.toLowerCase()));
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            this.state_items = this.state_items.filter(function (item) {
                console.log(item.title.toLowerCase().indexOf(val.toLowerCase()));
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            this.type_items = this.type_items.filter(function (item) {
                console.log(item.title.toLowerCase().indexOf(val.toLowerCase()));
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\joeop\Development\UniD-app\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      National Park Service brochures \n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n	<ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n	<ion-segment [(ngModel)]="sort_by">\n      <ion-segment-button value="name">\n        By Name\n      </ion-segment-button>\n	  <ion-segment-button value="state">\n        By State\n      </ion-segment-button>\n      <!--<ion-segment-button value="type">\n        By Type\n      </ion-segment-button>-->\n    </ion-segment>\n\n<div [ngSwitch]="sort_by">\n  <ion-list *ngSwitchCase="\'name\'">\n	  <button ion-item *ngFor="let item of name_items" (click)="itemSelected(item)">\n		{{ item.title }}\n	  </button>\n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'state\'">\n	  <button ion-item *ngFor="let item of state_items" (click)="itemSelected(item)">\n		{{ item.title }}\n	  </button>\n  </ion-list>\n  \n  <ion-list *ngSwitchCase="\'type\'">\n	  <button ion-item *ngFor="let item of type_items" (click)="itemSelected(item)">\n		{{ item.title }}\n	  </button>\n  </ion-list>\n</div>	\n	\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\joeop\Development\UniD-app\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* ModalController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProjectPage = (function () {
    function ProjectPage(navCtrl, http, navParams, sanitizer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.src = 'Connect to the internet to download content.';
        this.id = navParams.get("id");
        this.title = navParams.get("title");
        var project = this.http.get('https://www.unidescription.org/account/project/export_json/' + this.id);
        project
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            window.localStorage.setItem(_this.id, data.html);
            _this.src = _this.sanitizer.bypassSecurityTrustHtml(data.html);
            //console.log('my data: ', data);
        }, function (err) {
            var html = window.localStorage.getItem(_this.id);
            if (html.length > 100) {
                _this.src = _this.sanitizer.bypassSecurityTrustHtml(html);
            }
            else {
                _this.src = "Ensure you are connected to the internet to download content.";
            }
        });
    }
    ProjectPage.prototype.ionViewDidEnter = function () {
    };
    return ProjectPage;
}());
ProjectPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-project',template:/*ion-inline-start:"C:\Users\joeop\Development\UniD-app\src\pages\project\project.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{ this.title }}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content scroll="true" overflow-scroll="true">\n	<!--<div [innerHTML]="src"></div>-->\n	<iframe data-tap-disabled="true" [srcdoc]="this.src" width="100%" height="100%" border="0"></iframe>\n	<!--<iframe data-tap-disabled="true" [src]="this.url" width="100%" height="100%" border="0"></iframe>-->\n</ion-content>'/*ion-inline-end:"C:\Users\joeop\Development\UniD-app\src\pages\project\project.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["c" /* DomSanitizer */]])
], ProjectPage);

//# sourceMappingURL=project.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IntroPage = (function () {
    function IntroPage(navCtrl, http, viewCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.viewCtrl = viewCtrl;
    }
    IntroPage.prototype.dismissModal = function () {
        this.viewCtrl.dismiss();
    };
    return IntroPage;
}());
IntroPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-intro',template:/*ion-inline-start:"C:\Users\joeop\Development\UniD-app\src\pages\intro\intro.html"*/'<ion-content style="background-color: black; color: white;" padding (click)="dismissModal()">\n      <img src="statue.jpg" alt="A night photograph of the Statue of Liberty shows this beacon of American freedom lit from below, with spotlights, from the perch she stands upon to the tip of her iconic torch, held high by her right hand. " /><br />\n      <h1 style="text-align: center;">Audio Describe the World!</h1>\n      <p>\n        That is the mantra of the UniDescription project, which has begun with the translation of National Park Service brochures, including for Statue of Liberty National Monument. To hear those, just touch the screen and choose from among the dozens of brochures.\n      </p>\n      <button ion-button full type="submit">\n          Continue\n      </button>\n</ion-content>\n'/*ion-inline-end:"C:\Users\joeop\Development\UniD-app\src\pages\intro\intro.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular_index__["h" /* ViewController */]])
], IntroPage);

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* unused harmony export createTranslateLoader */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_project_project__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_intro_intro__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_project_project__["a" /* ProjectPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_intro_intro__["a" /* IntroPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (createTranslateLoader),
                    deps: [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]]
                }
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_project_project__["a" /* ProjectPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_intro_intro__["a" /* IntroPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_7__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, translate, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            window.localStorage.setItem('saw_intro', '0');
            translate.setDefaultLang('en');
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            //splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\joeop\Development\UniD-app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\joeop\Development\UniD-app\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[212]);
//# sourceMappingURL=main.js.map