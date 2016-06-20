import { Component, Directive } from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {SearchPipe} from 'app/pipe/search';
import 'rxjs/Rx';


@Component({ 
  pipes: [SearchPipe],
  selector: 'Home', 
  templateUrl: 'app/home/home.html'
})

export class HomeComponent { 
	name:String = "";
	sobe: Object[];
	constructor(http: Http){
		http.get('sobe.json')
		.map(res => res.json())
		.subscribe(sobe => this.sobe = sobe);
	}
}
