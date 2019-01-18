import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationStart, NavigationError, NavigationEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

	progress: number = 0;
	start: boolean = false;
	interval: any;

	constructor(private router: Router) { }

	ngOnInit() {
		this.router.events.subscribe(event => {
			if(event instanceof NavigationStart) {
				this.startBar();
			}

			if ((event instanceof NavigationError || event instanceof NavigationEnd || event instanceof NavigationCancel)) {
				this.completeBar();
			}
		});

		if(this.progress == 100) {
			
		}
	}

	startBar() {
		if(!this.start){
			this.start = true;
			this.interval = setInterval(()=> {
				if(this.progress < 100) {
					this.progress++;
				}else if(this.progress == 100) {
					this.reset();
				}
			}, 200);
		}
	}

	completeBar() {
		if(this.start) {
			this.progress = 100;
			this.start = false;
			this.reset();
		}
	}

	reset() {
		clearInterval(this.interval);
		this.progress = 0;
	}

}
