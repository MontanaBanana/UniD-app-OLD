import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ProjectPage } from '../project/project';

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
  
  constructor(public navCtrl: NavController, public http: Http) {
    this.initializeItems();
  }

  initializeItems() {

    if (!this.cached_name_items.length) {
		var projects = this.http.get('https://www.unidescription.org/project/npsProjects');
		projects
			.map(res => res.json())
			.subscribe(data => {
				this.name_items = data.name;
				this.state_items = data.state;
				this.type_items = data.type;
				this.cached_name_items = data.name;
				this.cached_state_items = data.state;
				this.cached_type_items = data.type;

				console.log('my data: ', data);
			});
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
