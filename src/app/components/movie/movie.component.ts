import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

import { CollectionService } from '../../services/collection.service';
import { DetailsService } from '../../services/details.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
	@Input('data') data: any;
	id: number;
	year: number;
	poster: string;
	watched: boolean;
	watchlist: boolean;

	constructor(
		private collection: CollectionService,
		private router: Router,
		private location: Location,
		private details: DetailsService
	) {}

	ngOnInit() {
		this.id = this.data.movie_id ? this.data.movie_id : this.data.id;
		this.year = this.data.year || this.data.release_date.split('-')[0];
		this.watched = this.data.watched;
		this.watchlist = this.data.watchlist;
		if(this.data.poster_path == null) {
			this.poster = "/site_images/placeholder.png"
		}else {
			this.poster = "https://image.tmdb.org/t/p/w500/"+this.data.poster_path;
		}
	}

	AddMovie(event) {
		let action = event.target.id;
		action = this[action] == true ? "remove" : action;
		
		this.collection.AddToCollection(this.id, action).subscribe(
			data => {
				if(data.succses){
					this.watched = action == "watched" ? true : false; 
					this.watchlist = action == "watchlist" ? true : false;
				}else {
					console.log(data.error);
				}
			}
		)
	}

	loadDetails() {
		this.details.open({open: true, id: this.id});
	}

}
