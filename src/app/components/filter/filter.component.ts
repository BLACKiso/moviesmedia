import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
	@Input('activate_filter') activate_filter: boolean;
	@Output() closed: EventEmitter<any> =  new EventEmitter();
	rangeValue: number = 5;
	filter_data: any = {};

	constructor(private filterService: FilterService) { }

	ngOnInit() {
	}

	toggleFilter() {
		this.activate_filter = this.activate_filter ? false : true;
		this.closed.emit(null);
	}

	displayRangeValue(event) {
		this.rangeValue = event.target.value;
	}

	filter(event) {
		event.preventDefault();
		let formElements = event.target;

		for(let i = 0; i < formElements.length; i++) {
			if(formElements[i].id !== "button") {
				if(formElements[i].id == "with_genres") {
					let genresArray = [];
					let options = formElements[i].options;
					for(let x = 0; x < options.length; x++) {
						if(options[x].selected){
							if(options[x].value == "") {
								genresArray = [];
								break;
							}else {
								genresArray.push(options[x].value);
							}
						} 
					}
					this.filter_data[formElements[i].id] = genresArray;
				}else {
					this.filter_data[formElements[i].id] = formElements[i].value;
				}
			}
		}
		this.filterService.setFilter(this.filter_data);
	}
}
