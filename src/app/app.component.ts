import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ModalController, Modal, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ProjectPage } from '../pages/project/project';
import { IntroPage } from '../pages/intro/intro';

//import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public modalCtrl: ModalController) {
    platform.ready().then(() => {
      window.localStorage.setItem('saw_intro', '0');
      if (window.localStorage.getItem('saw_intro') == '0') {
          window.localStorage.setItem('saw_intro', '1');
          let modal = this.modalCtrl.create(IntroPage);
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
}

