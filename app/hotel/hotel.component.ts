import { Component, Directive } from 'angular2/core';
import {Component, FormBuilder, Validators, ControlGroup, Control, FORM_DIRECTIVES, FORM_BINDINGS} from 'angular2/common'
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import 'rxjs/Rx';
import {Router, ROUTER_PROVIDERS} from 'angular2/router'

@Component({ 
  selector: 'Hotel', 
  templateUrl: 'app/hotel/hotel.html',
  directives: [FORM_DIRECTIVES],
  viewBindings: [FORM_BINDINGS]
})

export class HotelComponent { 

  hotelForm: ControlGroup;
  http: Http;
  router: Router;
  postResponse: String;
  select: Int = 1;
  
  constructor(builder: FormBuilder, http: Http,  router: Router) {
	this.http = http;
	this.router = router;
    this.hotelForm = builder.group({
     naziv: ["", Validators.none],
     adresa: ["", Validators.none],
     broj_soba: ["", Validators.none],
   });
  }
  
  onAddHotel(): void {
	var data = "naziv="+this.hotelForm.value.naziv+
              "&adresa="+this.hotelForm.value.adresa+
              "&broj_soba="+this.hotelForm.value.broj_soba;
	var headers = new Headers();
	headers.append('Content-Type', 'application/x-www-form-urlencoded');
	this.http.post('http://localhost/php/addhotel.php',data, {headers:headers})
    .map(res => res)
    .subscribe( data => this.postResponse = data,
	err => alert(JSON.stringify(err)),
	() => { 
	if(this.postResponse._body.indexOf("error") === -1){
		alert("Dodali ste hotel!");
	    this.router.parent.navigate(['./Home']);
	 }else{
		alert("Greska! Pokusajte ponovo!");
	 }
	 }
	);
	
  }
}
