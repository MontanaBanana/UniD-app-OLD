import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectPage } from '../pages/project/project';
import { IntroPage } from '../pages/intro/intro';
import { ComponentPage } from '../pages/component/component';
import { SafePipe } from './pipes/safe';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	ProjectPage,
    IntroPage,
    ComponentPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	ProjectPage,
    ComponentPage,
	IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
	Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

