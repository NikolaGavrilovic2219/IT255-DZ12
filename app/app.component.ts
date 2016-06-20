import {Component} from 'angular2/core';
import {RouteConfig,Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {HomeComponent } from 'app/home/home.component';
import {GalleryComponent } from 'app/gallery/gallery.component';
import {RoomComponent } from 'app/room/room.component';
import {SignUpComponent} from 'app/signup/signup.component';
import {SignInComponent} from 'app/signin/signin.component';
import {HotelComponent} from 'app/hotel/hotel.component';
import {RoomsComponent} from 'app/rooms/rooms.component';
import {Pipe} from 'angular2/core';

@Component({
    selector: 'my-app',
	templateUrl: 'app/router.html',
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {path:'/', name: 'Home', component: HomeComponent, useAsDefault: true},
  {path:'/gallery', name:'Gallery', component: GalleryComponent},
  {path:'/room', name:'Room', component: RoomComponent},
  {path:'/rooms', name:'Rooms', component: RoomsComponent},
  {path:'/signup', name:'SignUp', component: SignUpComponent},
  {path:'/signin', name:'SignIn', component: SignInComponent},
  {path:'/hotel', name:'Hotel', component: HotelComponent},
   
])

export class AppComponent { 
	router: Router;
	isAuth: String;

	constructor(router: Router) {
		this.router = router;
		router.subscribe((val) => {
				if(localStorage.getItem('token') !== null){ 
				this.isAuth = "yes";
			} else {
				this.isAuth = "no";
			}
		});
	}

	onLogout(): void {
		localStorage.removeItem("token");
		this.router.navigate(['./Home']);
		
		if(localStorage.getItem('token') !== null){
			this.isAuth = "yes";
		} else{
			this.isAuth = "no";
			}
		}
}
