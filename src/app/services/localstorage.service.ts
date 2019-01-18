import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
	storage = new Subject();

	constructor() { }

	setItem(key, value) {
		window.localStorage.setItem(key, value);
		this.storage.next('changed');
	}

	removeItem(key, value) {
		
	}

	getItem(key) {
		return window.localStorage.getItem(key);
	}

	watchStorage() {
		return this.storage.asObservable();
	}
}
