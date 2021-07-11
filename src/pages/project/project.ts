import { Component, ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController, Modal, AlertController } from 'ionic-angular';
import { Http, Response, BaseRequestOptions, RequestOptions, HttpModule, JsonpModule, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular';
import { SafePipe } from '../../app/pipes/safe';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { ComponentPage } from '../component/component';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {
  @ViewChild(Content) content: Content;
  public id;
  public title;
  public url;
  public src;
  public watch;
  public project;
  public loader;
  public sections1;
  public sections2;
  public sections3;
  public viewType;
  public isSearching = false;
  public notCached = false;
  public search_results_count;
  public search_text;

  public cached_project;

  searchQuery: string = '';

  scrollTop() {
     this.content.scrollToTop(400);
     document.getElementById("project_header").focus();
  }
  
  ionViewDidEnter() {
      var title_bar = document.getElementById("project-title");

      var project_content = document.getElementById("project-body").getElementsByClassName("scroll-content")[0] as HTMLElement;
     
console.log('clientHeight');
console.log(title_bar.clientHeight);
      if (title_bar.clientHeight < 40) {
          project_content.style.marginTop = "54px";
      }    
      else { 
          project_content.style.marginTop = (+title_bar.clientHeight + 6) +"px"; 
      }
  }

  onlyPlayOneIn(container) {
      container.addEventListener("play", function(event) {
      var audio_elements = container.getElementsByTagName("audio")
        for(var i=0; i < audio_elements.length; i++) {
          var audio_element = audio_elements[i];
          if (audio_element !== event.target) {
            audio_element.pause();
          }
        }
      }, true);
  }


  closeKeyboard() {
    this.keyboard.close();
    document.getElementById("searchResultHeader").focus();
  }


  initializeItems() {

    if (!this.cached_project) {
        var project = this.http.get('https://unidescription.org/account/project/export_jsonv2/' + this.id);
            project
                .map(res => res.json())
                .subscribe(
                  data => {
                    //alert(data);
                    this.notCached = false;
                    window.localStorage.setItem(this.id, JSON.stringify(data.project));
                    this.cached_project = data.project;
                    this.project = data.project;
                    this.sections1 = data.project.project_sections;
                    this.sections2 = data.project.project_sections;
                    this.sections3 = data.project.project_sections;
                    console.log(this.project);
                    //this.src = this.sanitizer.bypassSecurityTrustHtml(data.html);
                    //console.log('my data: ', data);
                    this.loader.dismissAll();
                    this.onlyPlayOneIn(document.body);

                  },
                  err => {
                    //alert(data);
                    try {
                        this.cached_project = JSON.parse(window.localStorage.getItem(this.id));
                        this.sections1 = this.cached_project.project_sections;
                        this.sections2 = this.cached_project.project_sections;
                        this.sections3 = this.cached_project.project_sections;
                        if (this.cached_project.id > 0) {
                            this.project = project;
                            this.notCached = false;
                        }
                        else {
                            //this.src = "Ensure you are connected to the internet to download content.";
                            this.notCached = true;
                        }
                        console.log(this.project);
                    }
                    catch (e) {
                        this.notCached = true;
                    }
                    this.loader.dismissAll();
                    this.onlyPlayOneIn(document.body);

                  }
                );

    }
    else {
        this.sections1 = this.cached_project.project_sections;
        this.sections2 = this.cached_project.project_sections;
        this.sections3 = this.cached_project.project_sections;
    }
  }

  showComponentModal(data) {
    let modal = this.modalCtrl.create({
		component: ComponentPage,
		componentProps: {
			component: data
		}
	});
    //modal.fireOtherLifecycles = false;
    modal.present();
  }

  constructor(public navCtrl: NavController, public http: Http, public modalCtrl: ModalController, public geolocation: Geolocation, public navParams: NavParams, public sanitizer: DomSanitizer, public loadingCtrl: LoadingController, public keyboard: Keyboard) {

  	this.src = 'Connect to the internet to download content.';
	this.id = navParams.get("id");
	this.title = navParams.get("title");

    this.viewType = 'text';
	
	this.presentLoading();

    this.initializeItems();
	
	this.addDurations();

    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
	   if (this.sections1) {
			for (let i = 0; i < this.sections1.length ; i++) {
			   let comp = this.sections1[i];
               let dist = this.distance(data.coords.latitude, data.coords.longitude, comp.latitude, comp.longitude, 'K') * 1000;

			   if (dist <= comp.gps_range) {
				   this.showComponentModal(comp);
			   }
			}
	   }
        
    });
  }

//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::
distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}
  
    filterItems(ev: any) {
		return 1;
	}

    addDurations(): void {
        setTimeout(function(){ 
            console.log('in addDurations');
            var audiofiles = document.getElementsByClassName("audiofiles");
            console.log(audiofiles);
			var duration_total = 0;
            for(var i = 0; i < audiofiles.length; i++)
            {
                console.log(document.getElementById(audiofiles.item(i).id)["duration"]);
                console.log(audiofiles.item(i).id+"-length");
				duration_total += document.getElementById(audiofiles.item(i).id)["duration"];
               document.getElementById(audiofiles.item(i).id+"-length").innerHTML = "Duration of audio: " + document.getElementById(audiofiles.item(i).id)["duration"] + " seconds";
            }
			console.log('duration_total');
			console.log(duration_total);
			var date = new Date(null);
			date.setSeconds(duration_total);
			var utc = date.toUTCString();
			// // retrieve each value individually - returns h:m:s
			//var time = date.getUTCHours() + ':' + date.getUTCMinutes() + ':' +  date.getUTCSeconds();
			//var time = date.toISOString().substr(11, 8);

			var string_time = '';
			if (date.getUTCHours() > 0) {
				string_time += date.getUTCHours() + ' hour';
				if (date.getUTCHours() > 1) {
					string_time += 's';
				}
				string_time += ', ';
			}

			if (date.getUTCMinutes() > 0) {
				string_time += date.getUTCMinutes() + ' minute';
				if (date.getUTCMinutes() > 1) {
					string_time += 's';
				}
				string_time += ', ';
			}

			if (date.getUTCSeconds() > 0) {
				string_time += date.getUTCSeconds() + ' second';
				if (date.getUTCSeconds() > 1) {
					string_time += 's';
				}
			}

			var ele = document.getElementById("duration");
			if (ele) {
				document.getElementById("duration").textContent = string_time.replace(/, $/, '');
			}
         }, 12500);
    }
	
	presentLoading() {
		this.loader = this.loadingCtrl.create({
		  content: "Loading brochure...",
		});
		this.loader.present();
	}

  stripEndBreaks(text: any){
      return text.replace(/(<br>\s*)+$/, '');
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
      this.sections3 = this.sections3.filter((item) => {
        item.title.replace("<strong>", "");
        item.title.replace("</strong>", "");
        item.title.replace(val, "<strong>"+val+"</strong>");
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        if (item.description != null) {
            return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        return false;
      })
      this.sections2 = this.sections2.filter((item) => {
        item.title.replace("<strong>", "");
        item.title.replace("</strong>", "");
        item.title.replace(val, "<strong>"+val+"</strong>");
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
          return true;
        }
        if (item.description != null) {
            return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        return false;
      })
      this.sections1 = this.sections1.filter((item) => {
        item.title.replace("<strong>", "");
        item.title.replace("</strong>", "");
        item.title.replace(val, "<strong>"+val+"</strong>");
        if (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) {
            //console.log('matched title ' + item.title);
          return true;
        }
        if (item.description != null) {
            return (item.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        return false;
      })
      this.search_results_count = this.sections1.length;
    }
    else {
        this.isSearching = false;
      this.sections3 = this.sections3.filter((item) => {
        item.title.replace("<strong>", "");
        item.title.replace("</strong>", "");
        item.title.replace(val, "<strong>"+val+"</strong>");
          return true;
      })
      this.sections2 = this.sections2.filter((item) => {
        item.title.replace("<strong>", "");
        item.title.replace("</strong>", "");
        item.title.replace(val, "<strong>"+val+"</strong>");
          return true;
      })
      this.sections1 = this.sections1.filter((item) => {
        item.title.replace("<strong>", "");
        item.title.replace("</strong>", "");
        item.title.replace(val, "<strong>"+val+"</strong>");
          return true;
      })
    }
  }


  
}
