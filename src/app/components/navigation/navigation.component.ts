import { Component, OnInit } from '@angular/core';

import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	userData: any;
	openMenu: string = "none";
	constructor(private storage: LocalstorageService) { }

	ngOnInit() {
		let b64Data = this.storage.getItem("ud");
		this.userData = JSON.parse(atob(b64Data));

		console.log(this.userData);
	}

	toggleMenu() {
		this.openMenu = this.openMenu == "none" ? "block" : "none";
	}

}
