import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

import { FilterService } from '../../services/filter.service';
import { SearchService } from '../../services/search.service';
import { MoviesBaseComponent } from '../movies.baseComponent';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent extends MoviesBaseComponent {
	resultsCount: number = 0;

	constructor(
		protected elementRef: ElementRef,
		protected router: Router,
		protected location: Location,
		protected filterService: FilterService,
		protected searchService: SearchService,
	)
	{
		super(elementRef, router, location, filterService);
	}

	ngOnInit() {
		super.ngOnInit();
		this.hideOptions();

		this.searchService.watchResults().subscribe(
			data => {
				this.resultsCount = data;
			}
		)

		this.filterService.watchFilter().subscribe(
			data => { this.elementRef.nativeElement.querySelector("#search-inp").value = ""; }
		)
	}

	hideOptions() {
		this.moreOptions = this.selectedType == "search" ? true : false;
	}

	typeChanged() {
		super.typeChanged();
		this.hideOptions();
	}

	search(event) {
		let keyword;
		if(event.type == "change") {
			keyword = event.target.value;
		}

		if(keyword !== undefined && keyword !== "") {
			this.searchService.getSearchByKeyword(keyword);
		}
		
	}
}
