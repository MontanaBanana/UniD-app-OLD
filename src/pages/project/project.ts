import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {
  public id;
  public title;
  public url;
  public src;

  ionViewDidEnter() {
  }


  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public sanitizer: DomSanitizer) {

  	this.src = 'Connect to the internet to download content.';
	this.id = navParams.get("id");
        this.title = navParams.get("title");
	
	var project = this.http.get('https://www.unidescription.org/account/project/export_json/' + this.id);
		project
			.map(res => res.json())
			.subscribe(
			  data => {
				window.localStorage.setItem(this.id, data.html);
				this.src = this.sanitizer.bypassSecurityTrustHtml(data.html);
				//console.log('my data: ', data);
			  },
			  err => {
				var html = window.localStorage.getItem(this.id);
				if (html.length > 100) {
					this.src = this.sanitizer.bypassSecurityTrustHtml(html);
				}
				else {
					this.src = "Ensure you are connected to the internet to download content.";
				}
			  }
			);
	
  }
  
}
