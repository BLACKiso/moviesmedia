import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	registerLink = "/moviesmedia_api/authentication/register.php?data=";
	loginLink = "/moviesmedia_api/authentication/login.php?data=";
	authCheckLink = "/moviesmedia_api/authentication/authenticate.php";

	constructor(private http: HttpClient) { }

	action(credentials, type) {
		let data = this.encodeData(credentials);
		return this.http.get<any>(this[type+"Link"]+data);
	}

	isLoggedIn() {
		return this.http.get<any>(this.authCheckLink, { withCredentials: true });
	}

	encodeData(data) {
		return btoa(JSON.stringify(data));
	}
}
