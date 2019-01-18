import { Component, ElementRef, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

import { FilterService } from '../../services/filter.service';
import { MoviesBaseComponent } from '../movies.baseComponent';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent extends MoviesBaseComponent {
	defaultSort: string = "DESC";

	constructor(
		protected elementRef: ElementRef,
		protected router: Router,
		protected location: Location,
		protected filterService: FilterService)
	{
		super(elementRef, router, location, filterService);
	}

	ngOnInit() {
		super.ngOnInit();
		this.hideOptions();
	}

	hideOptions() {
		this.moreOptions = this.selectedType == "recommendations" ? false : true;
	}

	typeChanged() {
		super.typeChanged();
		let DOM = this.elementRef.nativeElement;
		if(this.moreOptions) DOM.querySelector('#sortSelect').value = this.defaultSort;
		this.hideOptions();
	}

	sortItems(event) {
		this.filterService.setSort(event.target.value);
	}
}
