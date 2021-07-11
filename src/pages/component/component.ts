import { Component, OnInit, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from "ionic-angular/index";
import { ProjectPage } from "../project/project"

import { Storage } from '@ionic/storage';

/**
 * Generated class for the ComponentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-component',
  templateUrl: 'component.html',
})
export class ComponentPage implements OnInit {
  component: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController, public modalController: ModalController, private storage: Storage) {
      storage.get('component').then((val) => {
          this.component = val;
      });
  }


  ngOnInit() {
	console.log(this.component);
  }

  dismissModal() {
      this.storage.set('is_open', false);
      this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComponentPage');
  }

}
