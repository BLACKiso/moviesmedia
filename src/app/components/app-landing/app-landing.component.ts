import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MainServiceService } from '../../services/main-service.service';

@Component({
  selector: 'app-app-landing',
  templateUrl: './app-landing.component.html',
  styleUrls: ['./app-landing.component.css']
})
export class AppLandingComponent implements OnInit {

	fromLanding: boolean = true;
	mainState: boolean;
	subscription: Subscription;

	constructor(private mainService:MainServiceService) { }

	ngOnInit() {
		this.subscription = this.mainService.landingstate.subscribe(
			state => this.mainState = state
		)
	}

}
