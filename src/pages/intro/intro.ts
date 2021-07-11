import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, Modal, AlertController } from 'ionic-angular';
import { ViewController } from "ionic-angular/index";
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ProjectPage } from '../project/project';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  constructor(public navCtrl: NavController, public http: Http, private viewCtrl:ViewController) {

  }

  dismissModal() {
        this.viewCtrl.dismiss();
  }
  
  public goToAboutUs() {
	this.navCtrl.push(ProjectPage, {
		id: 281,
		title: 'About Us - The UniDescription Project'
	});
  }
  
  public goToFaq() {
	this.navCtrl.push(ProjectPage, {
		id: 580,
		title: 'FAQ'
	}); 
  }
  
  public goToHowTo() {
	this.navCtrl.push(ProjectPage, {
		id: 581,
		title: 'How to Use This App'
	}); 
  }  
  
  
}
