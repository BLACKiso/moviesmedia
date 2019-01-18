import { OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

import { FilterService } from '../services/filter.service';

export class MoviesBaseComponent implements OnInit {
	activate_filter: boolean = false;
	moreOptions: boolean;
	filter: string;
	selectedType: string;
	currentPath: string;

	constructor(
		protected elementRef: ElementRef,
		protected router: Router,
		protected location: Location,
		protected filterService: FilterService
	){}

	ngOnInit() {
		let _path = this.location.path().split('/');
		this.selectedType = _path[2];
		this.currentPath = _path[1];
	}

	ngAfterViewInit() {
		this.typeChanged();
	}

	changeType(event) {
		let target = event.currentTarget;
		this.selectedType = target.id;
		this.router.navigate(['/'+this.currentPath+'/'+this.selectedType]);
		this.typeChanged();
	}

	typeChanged() {
		let DOM = this.elementRef.nativeElement;
		//Animate bar
		let bar = DOM.querySelector(".border-bottom");
		let parent = bar.parentElement;
		let selectedElemnt = DOM.querySelector("#"+this.selectedType);

		let selectedOffset = selectedElemnt.offsetLeft;
		let offsetPercentage = (selectedOffset*100)/parent.clientWidth;
		let elemntPrcWidth = ((selectedElemnt.clientWidth*100)/parent.clientWidth)/2;
		let barPrcWidth = ((bar.clientWidth*100)/parent.clientWidth)/2;

		let final = (offsetPercentage + elemntPrcWidth)-barPrcWidth;
		bar.style.left = final+"%";
	}

	toggleFilter() {
		this.activate_filter = !this.activate_filter;
	}
}
