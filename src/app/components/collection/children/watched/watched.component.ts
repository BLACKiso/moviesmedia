import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

import { CollectionService } from '../../../../services/collection.service';
import { FilterService } from '../../../../services/filter.service';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit {
	retrevedData: any = [];
	selectedType: string = "watched";
	page: number = 1;
	maxPage: number;
	goNext: boolean = true;
	pageChange: boolean = false;
	sort: string = "DESC";
	bindFix: any;
	filterData: any;
	filterSubscription: any = new Subscription();

	constructor(
		private collectionApi: CollectionService,
		private filterService: FilterService,
		private elementRef: ElementRef
	) { }

	ngOnInit() {
		this.getData();
		this.bindFix = this.loadNextPage.bind(this);
		window.addEventListener('scroll', this.bindFix, false);
		let sub1 = this.filterService.watchFilter().subscribe(data => {
			this.filter(data);
		})

		let sub2 = this.filterService.watchSort().subscribe(data => {
			this.sort = data;
			this.runResets(true);
			this.getData();
		});

		this.filterSubscription.add(sub1);
		this.filterSubscription.add(sub2);
	}

	loadNextPage(this) {
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

	filter(data) {
		if(data) {
			this.runResets();
			this.filterData = btoa(JSON.stringify(data));
			this.getData();
		}
	}

	runResets(filter?) {
		this.page = 1;
		this.pageChange = false;
		if(!filter) this.filterService.resetFilter();
	}

	getData() {
		this.collectionApi.getCollectionData(this.selectedType, this.sort, this.page, this.filterData)
			.subscribe(
				data => {
					if(data.error) {
						this.retrevedData = [];
					}else {
						this.retrevedData =  this.pageChange ? this.retrevedData.concat(data.movies) : data.movies;
						this.maxPage = data.total_pages;
						this.goNext = true;
					}
				}
			)
	}
	
	ngOnDestroy() {
		window.removeEventListener('scroll', this.bindFix, false);
		this.filterSubscription.unsubscribe();
	}

}
