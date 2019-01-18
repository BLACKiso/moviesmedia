import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from "@angular/router";

import { AuthenticationService } from '../services/Authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

	constructor(
		private auth : AuthenticationService,
		private router: Router
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		// return this.auth.isLoggedIn().pipe(map(
		// 	data => {
		// 		if(data.login == true) {
		// 			return true;
		// 		}else {
		// 			this.router.navigate(['']);
		// 			return false;
		// 		}
		// 	}
		// ));
		let localS_check = window.localStorage.getItem("lc") == "true" ? true : false; 
		if(!localS_check) this.router.navigate(['']);
		return localS_check;
	}
}
