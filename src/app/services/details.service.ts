import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
	openDetails: any = new Subject();

	constructor(
		private http: HttpClient,
		private localStorage: LocalstorageService,
	) { }

	watchDetails() {
		return this.openDetails.asObservable();
	}

	open(obj) {
		this.openDetails.next(obj);
	}

	close(obj) {
		this.openDetails.next(obj);
	}

	getDetails(id) {
		let headers = new HttpHeaders();
		headers = headers.set('auth', this.localStorage.getItem('jwt'));

		let link = "/moviesmedia_api/api/movies_api/details/?id="+id;
		return this.http.get<any>(link, {headers: headers});
	}
}
