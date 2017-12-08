import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectPage } from '../pages/project/project';
import { IntroPage } from '../pages/intro/intro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	ProjectPage,
    IntroPage
  ],
  imports: [
    BrowserModule,
	HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		}
	})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	ProjectPage,
	IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
