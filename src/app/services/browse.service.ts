import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class BrowseService {
	apiLink: string = "/moviesmedia_api/api/movies_api/browse/";

	private _httpOptions = (() => {
		let headers = new HttpHeaders();
		headers = headers.set('auth', this.localStorage.getItem('jwt'));
		return {headers: headers};
	})();

	constructor(
		private http: HttpClient,
		private localStorage: LocalstorageService,
	) {}

	getMovies(type, page?) {
		let _page = page ? page : 1; 
		this.apiLink = "/moviesmedia_api/api/movies_api/browse/?type="+type+"&page="+_page;
		return this.http.get<any>(this.apiLink, this._httpOptions);
	}
}
