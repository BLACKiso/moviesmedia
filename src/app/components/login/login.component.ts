import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

import { MainServiceService } from '../../services/main-service.service';
import { AuthenticationService } from '../../services/Authentication.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	private password: string;
	private username: string;
	error: string;
	@Input() landing: boolean;

	constructor(
		private mainService:MainServiceService,
		private auth:AuthenticationService,
		private router: Router,
		private localstorage: LocalstorageService
	) { }

	ngOnInit() {}

	switchToRegister() {
		if(!this.landing) {
			this.router.navigate(['/register']);
		}else {
			this.mainService.changeLandingState(false);
		}
	}

	login() {
		let creds = {
			"username": this.username,
			"password": this.password
		};

		this.auth.action(creds, "login")
			.subscribe(
				data => {
					if(data.sucsses) {
						let userInfo = data.JWT_key.split('.')[1];
						this.localstorage.setItem('ud', userInfo);
						this.localstorage.setItem('jwt', data.JWT_key);
						this.localstorage.setItem('lc', "true");

						this.router.navigate(['/home']);
					}else if(data.error) {
						this.error = data.error;
					}
				}, 
				err => {
					this.error = err;
				}
			);
	}

	checkInput(event) {
		event.preventDefault();
		this.username = event.target.querySelector('#username').value;
		this.password = event.target.querySelector('#password').value;

		if(this.username == "" || this.password == "") {
			this.error = "Please Enter your Information!";
		}else {
			this.error = undefined;
		}

		if(this.error == undefined) {
			this.login();
		}
	}

}
