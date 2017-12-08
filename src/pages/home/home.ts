import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, Modal, AlertController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ProjectPage } from '../project/project';
import { IntroPage } from '../intro/intro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchQuery: string = '';
  
  name_items = [];
  cached_name_items = [];
  
  state_items = [];
  cached_state_items = [];
  
  type_items = [];
  cached_type_items = [];
  
  sort_by: string = "name";
  
  constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController) {
    this.initializeItems();
  }

  ionViewDidEnter() {
      if (window.localStorage.getItem('saw_intro') == '0') {
            window.localStorage.setItem('saw_intro', '1');
            let modal = this.modalCtrl.create(IntroPage);
            //modal.fireOtherLifecycles = false;
            modal.present();
      }
  }

  initializeItems() {

    if (!this.cached_name_items.length) {
		var projects = this.http.get('https://www.unidescription.org/project/npsProjects');
		projects
			.map(res => res.json())
			.subscribe(
			    data => {
				window.localStorage.setItem('parklist-name', JSON.stringify(data.name));
				this.name_items = data.name;
				window.localStorage.setItem('parklist-state', JSON.stringify(data.state));
				this.state_items = data.state;
				window.localStorage.setItem('parklist-type', JSON.stringify(data.type));
				this.type_items = data.type;
				window.localStorage.setItem('parklist-cached-name', JSON.stringify(data.name));
				this.cached_name_items = data.name;
				window.localStorage.setItem('parklist-cached-state', JSON.stringify(data.state));
				this.cached_state_items = data.state;
				window.localStorage.setItem('parklist-cached-type', JSON.stringify(data.type));
				this.cached_type_items = data.type;
				console.log('my data: ', data);
			    },
			    err => {
				this.name_items = JSON.parse(window.localStorage.getItem('parklist-name'));
				this.state_items = JSON.parse(window.localStorage.getItem('parklist-state'));
				this.type_items = JSON.parse(window.localStorage.getItem('parklist-type'));
				this.cached_name_items = JSON.parse(window.localStorage.getItem('parklist-cached-name'));
				this.cached_state_items = JSON.parse(window.localStorage.getItem('parklist-cached-state'));
				this.cached_type_items = JSON.parse(window.localStorage.getItem('parklist-cached-type'));

			    }
			);
	}
	else {
		this.name_items = this.cached_name_items;
		this.state_items = this.cached_state_items;
		this.type_items = this.cached_type_items;
	}
  }
  
  public itemSelected(item) {
	this.navCtrl.push(ProjectPage, {
		id: item.id,
		title: item.title
	});
	console.log(item);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
	
	console.log('val: ' + val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.name_items = this.name_items.filter((item) => {
		  console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
	  this.state_items = this.state_items.filter((item) => {
		  console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
	  this.type_items = this.type_items.filter((item) => {
		  console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
}
