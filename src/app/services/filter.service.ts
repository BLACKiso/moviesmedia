import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
	filterDataSubject: any = new Subject();
	sortData: any = new Subject();
	constructor() { }

	setFilter(data) {
		this.filterDataSubject.next(data);
	}

	resetFilter() {
		this.filterDataSubject.next(null);
	}

	watchFilter() {
		return this.filterDataSubject.asObservable();
	}

	setSort(data) {
		this.sortData.next(data);
	}

	watchSort() {
		return this.sortData.asObservable();
	}

}
