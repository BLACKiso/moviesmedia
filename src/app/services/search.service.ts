import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
	link: string;
	search: any = new Subject();
	resultsNumber: any = new Subject();

	private _httpOptions = (() => {
		let headers = new HttpHeaders();
		headers = headers.set('auth', this.localStorage.getItem('jwt'));
		return {headers: headers};
	})();

	constructor(
		private http: HttpClient,
		private localStorage: LocalstorageService,
	) {}

	getSearchByKeyword(keyword, page?) {
		this.link = "/moviesmedia_api/api/movies_api/search/?keyword="+keyword;
		if(page) this.link += "&page="+page;

		this.http.get<any>(this.link, this._httpOptions).subscribe(
			data => {
				data.keyword = keyword;
				this.search.next(data);
				this.resultsNumber.next(data.total_results);
			}
		)
	}

	getCustomData(filter, page?) {
		let _filter = btoa(JSON.stringify(filter));
		this.link = "/moviesmedia_api/api/movies_api/search/?filter="+_filter;
		if(page) this.link += "&page="+page;

		this.http.get<any>(this.link, this._httpOptions).subscribe(
			data => {
				data.filter = filter;
				this.search.next(data);
				this.resultsNumber.next(0);
			}
		)
	}

	watchSearch() {
		return this.search.asObservable();
	}

	watchResults() {
		return this.resultsNumber.asObservable();
	}
}
