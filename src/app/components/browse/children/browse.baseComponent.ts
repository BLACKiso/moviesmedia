import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { BrowseService } from '../../../services/browse.service';

export class BrowseBaseComponent implements OnInit {
	retrevedData: any = [];
	selectedType: string;
	page: number = 1;
	maxPage: number;
	goNext: boolean = true;
	pageChange: boolean = false;
	bindFix: any;

	constructor(
		protected browseService: BrowseService,
		protected location: Location,
		protected elementRef: ElementRef
	){}

	ngOnInit() {
		let _path = this.location.path().split('/');
		this.selectedType = _path[2];

		this.getData();
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
		this.browseService.getMovies(this.selectedType, this.page).subscribe(
			data => {
				if(data.error) {
					this.retrevedData = [];
				}else {
					this.retrevedData =  this.pageChange ? this.retrevedData.concat(data.results) : data.results;
					this.maxPage = data.total_pages;
					this.goNext = true;
				}
			}
		)
	}

	ngOnDestroy() {
		window.removeEventListener('scroll', this.bindFix, false);
	}

}
