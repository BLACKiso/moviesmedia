import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { BrowseBaseComponent } from '../browse.baseComponent';
import { BrowseService } from '../../../../services/browse.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent extends BrowseBaseComponent {
	
	constructor(
		protected browseService: BrowseService,
		protected location: Location,
		protected elementRef: ElementRef
	){
		super(browseService, location, elementRef);
	}
}
