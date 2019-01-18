import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './guards/authentication.guard';
import { LogedinGuard } from './guards/logedin.guard';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppLandingComponent } from './components/app-landing/app-landing.component';
import { HomeComponent } from './components/home/home.component';
import { CollectionComponent } from './components/collection/collection.component';
import { BrowseComponent } from './components/browse/browse.component';
import { DetailsComponent } from './components/details/details.component';

// Children
import { WatchedComponent } from './components/collection/children/watched/watched.component';
import { WatchlistComponent } from './components/collection/children/watchlist/watchlist.component';
import { NowPlayingComponent } from './components/browse/children/now-playing/now-playing.component';
import { PopularComponent } from './components/browse/children/popular/popular.component';
import { UpcomingComponent } from './components/browse/children/upcoming/upcoming.component';
import { SearchComponent } from './components/browse/children/search/search.component';
import { RecommendationsComponent } from './components/collection/children/recommendations/recommendations.component';


const routes: Routes = [
	{
		path: '',
		component: AppLandingComponent,
		canActivate: [LogedinGuard]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [LogedinGuard]
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [LogedinGuard]
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthenticationGuard]
	},
	{
		path: 'collection',
		component: CollectionComponent,
		canActivate: [AuthenticationGuard],
		children: [
			{
				path: '',
				redirectTo: 'watched',
				pathMatch: 'full'
			},
			{
				path: 'watched',
				component: WatchedComponent
			},
			{
				path: 'watchlist',
				component: WatchlistComponent
			},
			{
				path: 'recommendations',
				component: RecommendationsComponent
			}
		]
	},
	{
		path: 'browse',
		component: BrowseComponent,
		canActivate: [AuthenticationGuard],
		children: [
			{
				path: '',
				redirectTo: 'now_playing',
				pathMatch: 'full'
			},
			{
				path: 'now_playing',
				component: NowPlayingComponent
			},
			{
				path: 'popular',
				component: PopularComponent
			},
			{
				path: 'upcoming',
				component: UpcomingComponent
			},
			{
				path: 'search',
				component: SearchComponent
			}
		]
	},
	{
		path: 'details/:id',
		component: DetailsComponent,
		canActivate: [AuthenticationGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
