import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

import { MainServiceService } from '../../services/main-service.service';
import { AuthenticationService } from '../../services/Authentication.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	@Input() landing: boolean;
	error: string;
	private username: string;
	private email: string;
	private password: string;
	private re_password: string;

	constructor(
		private mainService:MainServiceService,
		private auth:AuthenticationService,
		private router: Router,
		private localstorage: LocalstorageService
	) { }

	ngOnInit() {
	}

	switchToLogin() {
		if(!this.landing) {
			this.router.navigate(['/login']);
		}else {
			this.mainService.changeLandingState(true);
		}
	}

	register() {
		let creds = {
			"username": this.username,
			"email": this.email,
			"password": this.password,
			"re_password": this.re_password
		};

		this.auth.action(creds, "register")
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
		this.email = event.target.querySelector('#email').value;
		this.password = event.target.querySelector('#password').value;
		this.re_password = event.target.querySelector('#re_password').value;

		if(this.username == "" || this.email == "" || this.password == "" || this.re_password == "") {
			this.error = "Please Enter your Information!";
		}else {
			this.error = undefined;
		}

		if(this.error == undefined) {
			this.register();
		}
	}

}
