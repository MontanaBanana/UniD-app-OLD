import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, Modal, AlertController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';

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
  
  latitude: number = 0;
  longitude: number = 0;
  
  sort_by: string = "name";

  public isSearching = false;
  public search_results_count;
  public search_text;
  
  constructor(public navCtrl: NavController, public http: Http, public geolocation: Geolocation, public modalCtrl: ModalController, public keyboard: Keyboard) {
    this.initializeItems();
  }

  ionViewWillEnter() {
      return;
      /*if (window.localStorage.getItem('saw_intro') == '0') {
            window.localStorage.setItem('saw_intro', '1');
            let modal = this.modalCtrl.create(IntroPage);
            //modal.fireOtherLifecycles = false;
            modal.present();
            }*/
  }
  
  showIntro() {
	let modal = this.modalCtrl.create(IntroPage);
    //modal.fireOtherLifecycles = false;
    modal.present();
  }

  closeKeyboard() {
    this.keyboard.close();
        document.getElementById("searchResultHeader").focus();
  }
  
  fetchProjects() {

	var projects = this.http.get('https://unidescription.org/project/npsProjects?lat='+this.latitude+'&lon='+this.longitude);
	//var projects = this.http.get('https://www.unidescription.org/project/npsProjectsV2');
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
				//console.log('my data: ', data);
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

  initializeItems() {
    if (!this.cached_name_items.length) {

		this.geolocation.getCurrentPosition().then((res) => {
			this.latitude   = res.coords.latitude;
			this.longitude  = res.coords.longitude;
			console.log(this.latitude);
			console.log(this.longitude);
			this.fetchProjects();
			
		}).catch((error) => {
			this.fetchProjects();
		});
	
	} else {
		this.name_items = this.cached_name_items;
		this.state_items = this.cached_state_items;
		this.type_items = this.cached_type_items;
	}
	
  }
  
  public goToAboutUs() {
	this.navCtrl.push(ProjectPage, {
		id: 281,
		title: 'About Us - The UniDescription Project'
	});
  }
  
  public itemSelected(item) {
	this.navCtrl.push(ProjectPage, {
		id: item.id,
		title: item.title
	});
    //console.log(item);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    this.search_text = val;
	
    //console.log('val: ' + val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isSearching = true;
      this.name_items = this.name_items.filter((item) => {
        //console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
	  this.state_items = this.state_items.filter((item) => {
        //console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
	  this.type_items = this.type_items.filter((item) => {
        //console.log( item.title.toLowerCase().indexOf(val.toLowerCase()));
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.search_results_count = this.type_items.length;
    }
    else {
      this.isSearching = false;
    }
  }
  
}
