import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { SearchService } from '../../../../services/search.service';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	retrevedData: any = [];
	keyword: string;
	filter: any;
	page: number = 1;
	maxPage: number;
	goNext: boolean = true;
	pageChange: boolean = false;
	bindFix: any;

	constructor(
		private searchService: SearchService,
		private filterService: FilterService,
		protected elementRef: ElementRef
	) { }

	ngOnInit() {
		this.searchService.watchSearch().subscribe(
			data => {
				if(data.keyword !== this.keyword) this.reset();
				this.retrevedData =  this.pageChange ? this.retrevedData.concat(data.results) : data.results;
				this.goNext = true;
				this.maxPage = data.total_pages;
				this.keyword = data.keyword;
				this.filter = data.filter;
			}
		)

		this.filterService.watchFilter().subscribe(
			data => {
				this.reset();
				this.searchService.getCustomData(data);
				this.keyword = undefined;
			}
		)

		this.searchService.getCustomData({});
		this.bindFix = this.loadNextPage.bind(this);
		window.addEventListener('scroll', this.bindFix, false);
	}

	loadNextPage() {
		let body = this.elementRef.nativeElement.querySelector(".movies-container");
		if ((window.innerHeight + window.scrollY) >= body.offsetHeight) {
			if(this.page < this.maxPage && this.goNext) {
				this.page++;
				this.pageChange = true;
				this.goNext = false;
				this.getData();
			}
		}
	}

	getData() {
		if(this.keyword !== undefined && this.keyword !== "") {
			this.searchService.getSearchByKeyword(this.keyword, this.page);
		}else {
			this.searchService.getCustomData(this.filter, this.page);
		}
	}

	reset() {
		this.pageChange = false;
		this.page = 1;
	}

	ngOnDestroy() {
		window.removeEventListener('scroll', this.bindFix, false);
	}
}
