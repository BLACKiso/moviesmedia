import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AuthenticationGuard } from './guards/authentication.guard';
import { MainServiceService } from './services/main-service.service';
import { BrowseService } from './services/browse.service';
import { CollectionService } from './services/collection.service';
import { FilterService } from './services/filter.service';
import { LocalstorageService } from './services/localstorage.service';
import { SearchService } from './services/search.service';
import { DetailsService } from './services/details.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CollectionComponent } from './components/collection/collection.component';
import { BrowseComponent } from './components/browse/browse.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { MovieComponent } from './components/movie/movie.component';
import { FilterComponent } from './components/filter/filter.component';
import { WatchedComponent } from './components/collection/children/watched/watched.component';
import { WatchlistComponent } from './components/collection/children/watchlist/watchlist.component';
import { NowPlayingComponent } from './components/browse/children/now-playing/now-playing.component';
import { PopularComponent } from './components/browse/children/popular/popular.component';
import { UpcomingComponent } from './components/browse/children/upcoming/upcoming.component';
import { SearchComponent } from './components/browse/children/search/search.component';
import { RecommendationsComponent } from './components/collection/children/recommendations/recommendations.component';
import { DetailsComponent } from './components/details/details.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		AppLandingComponent,
		HomeComponent,
		NavigationComponent,
		CollectionComponent,
		BrowseComponent,
		LoadingBarComponent,
		MovieComponent,
		FilterComponent,
		WatchedComponent,
		WatchlistComponent,
		NowPlayingComponent,
		PopularComponent,
		UpcomingComponent,
		SearchComponent,
		RecommendationsComponent,
		DetailsComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		PerfectScrollbarModule
	],
	providers: [
		MainServiceService,
		AuthenticationGuard,
		BrowseService,
		CollectionService,
		FilterService,
		LocalstorageService,
		SearchService,
		DetailsService,
		{
    		provide: PERFECT_SCROLLBAR_CONFIG,
    		useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    	}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
