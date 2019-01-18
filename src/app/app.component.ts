import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { Location } from '@angular/common';

import 'rxjs/add/operator/filter';

import { LocalstorageService } from './services/localstorage.service';
import { DetailsService } from './services/details.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	checkLogin: boolean =  this.localstorage.getItem("lc") == "true" ? true : false;
	openDetails: boolean = false;
	detailID: number;
	prevPath: string;
	teeest: string;

	constructor(
		private elementRef: ElementRef,
		private localstorage: LocalstorageService,
		private router: Router,
		private location: Location,
		private details: DetailsService
	) {}

	ngOnInit() {
		this.localstorage.watchStorage().subscribe(
			data => {
				let newValue = this.localstorage.getItem("lc") == "true" ? true : false;
				if(newValue == undefined) {
					this.checkLogin = false;
				}else {
					this.checkLogin = newValue;
				}
			}
		)

		// this.disableScroll();

		this.details.watchDetails().subscribe(
			data => {
				if(data.open) {
					this.openDetails = true;
					this.detailID = data.id;
					this.prevPath = this.location.path();
					this.location.replaceState('/details/'+data.id);
					this.disableScroll();
				}else {
					this.openDetails = false;
					this.location.replaceState(this.prevPath);
					this.enableScroll();
				}
			}
		)

		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.openDetails = false;
				this.enableScroll();
			}
		});
	}

	disableScroll() {
		this.elementRef.nativeElement.parentElement.classList.add('no-scroll');
	}

	enableScroll() {
		this.elementRef.nativeElement.parentElement.classList.remove('no-scroll');
	}


}
