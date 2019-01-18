import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { BrowseBaseComponent } from '../browse.baseComponent';
import { BrowseService } from '../../../../services/browse.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent extends BrowseBaseComponent {
	
	constructor(
		protected browseService: BrowseService,
		protected location: Location,
		protected elementRef: ElementRef
	){
		super(browseService, location, elementRef);
	}
}
