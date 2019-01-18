import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
	_landingState = new BehaviorSubject<boolean>(true);
	landingstate = this._landingState.asObservable();

	constructor() { }

	changeLandingState(val) {
		this._landingState.next(val);
	}

}
