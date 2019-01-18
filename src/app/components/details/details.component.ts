import { Component, OnInit, ElementRef } from '@angular/core';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Location } from '@angular/common';

import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	fromRouter: boolean = false;
	movieId: number;
	data: any = [];

	ps_cast:boolean = true;
	ps_crew:boolean = true;

	public config: PerfectScrollbarConfigInterface = {};

	constructor(
		private details: DetailsService,
		private location: Location
	) {
		let path = this.location.path().split('/');
		if(path[2]) {
			this.movieId = parseInt(path[2]);
			this.getData();
		}
	}

	ngOnInit() {
		this.details.watchDetails().subscribe(
			data => {
				this.fromRouter = data.open ? false : true;
			}
		)
		console.log("Entred Details...");
	}

	close() {
		this.details.close({open: false});
	}

	expand(event) {
		let target = event.currentTarget;
		let parent = target.parentElement;
		let children = parent.children;

		for(let i = 0; i < children.length; i++) {
			if(children[i] !== target) {
				children[i].classList.add('chrink');
				children[i].classList.remove('expand');
			}else {
				children[i].classList.remove('chrink');
				children[i].classList.add('expand');
			}
		}

		if(target.id == "cast") {
			this.ps_cast = false;
			this.ps_crew = true;
		}else {
			this.ps_cast = true;
			this.ps_crew = false;
		}
	}

	getData() {
		this.details.getDetails(this.movieId).subscribe(
			data => {
				let customData = data;

				customData.year = parseInt(data.release_date.split('-')[0]);
				customData.s_genres = this.parseArray(customData.genres);
				customData.production = this.parseArray(customData.production_companies);
				customData.s_runtime = this.timeConvert(customData.runtime);
				customData.budget = this.money(customData.budget);
				customData.revenue = this.money(customData.revenue);
				customData.director = this.getDirectors(customData.credits.crew);
				customData.rating = this.getRating(customData.releases.countries);
				customData.credits.cast = this.placeholders(customData.credits.cast);
				customData.credits.crew = this.placeholders(customData.credits.crew);
				this.data.push(customData);
			}
		)
	}

	placeholders(_array) {
		return _array.map(single => {
			if(single.profile_path == null) {
				single.profile_path = "/site_images/default.png";
			}else {
				single.profile_path = "https://image.tmdb.org/t/p/w185"+single.profile_path;
			}
			return single;
		});
	}

	parseArray(_array) {
		let holder = [];
		_array.forEach(single => {
			holder.push(single.name);
		});
		return holder.join(', ');
	}

	getDirectors(_array) {
		let holder = [];
		_array.forEach(single => {
			if(single.job == "Director") {
				holder.push(single);
			}
		});
		return this.parseArray(holder);
	}

	getRating(_array) {
		let holder, BreakException = {};
		try {
			_array.forEach(single => {
				if(single.iso_3166_1 == "US" && single.certification !== "") {
					holder = single.certification;
					throw BreakException;
				}
			});
		} catch(e) {
			if (e !== BreakException) throw e;
		}

		if(holder == undefined) holder = "NUN";
		return holder;
	}

	money(num) {
	    return Math.abs(Number(num)) >= 1.0e+9? (Math.abs(Number(num)) / 1.0e+9).toFixed(1) + "B"
	    	: Math.abs(Number(num)) >= 1.0e+6? Math.round(Math.abs(Number(num)) / 1.0e+6) + "M"
	    	: Math.abs(Number(num)) >= 1.0e+3? Math.round(Math.abs(Number(num)) / 1.0e+3) + "K"
	    	: Math.abs(Number(num));
	}

	timeConvert(time) {
		var minutes = time % 60;
		var hours = (time - minutes) / 60;
		return hours + "h" + minutes + "min";
	}

}
