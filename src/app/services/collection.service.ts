import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
	apiLink: string = "/moviesmedia_api/api/collection_api/";

	private _httpOptions = (() => {
		let headers = new HttpHeaders();
		headers = headers.set('auth', this.localStorage.getItem('jwt'));
		return {headers: headers};
	})();

	constructor(
		private http: HttpClient,
		private localStorage: LocalstorageService,
	) {}

	getCollectionData(type, sort, page?, filter?) {
		this.apiLink = "/moviesmedia_api/api/collection_api/?type="+type+"&sort="+sort;
		if(page)  this.apiLink += "&page="+page;
		if(filter)  this.apiLink += "&filter="+filter;

		return this.http.get<any>(this.apiLink, this._httpOptions);
	}

	AddToCollection(movie_id, action) {
		this.apiLink = "/moviesmedia_api/api/collection_api/?movie="+movie_id+"&action="+action;
		return this.http.get<any>(this.apiLink, this._httpOptions);
	}
}
