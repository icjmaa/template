import { Injectable, Inject } from '@angular/core';
import { filter, map, mergeMap } from 'rxjs/operators'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

const SEPARATOR = ' | ';

@Injectable({
	providedIn: 'root'
})
export class TitleService {
	public app_title = '';
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
		private metaService : Meta,
		@Inject(DOCUMENT) private doc,
		@Inject('env') private env
	) {
		this.app_title = this.env.appTitle;
	}

	init() {
		this.router.events.pipe(
			filter((event) => event instanceof NavigationEnd),
			map(() => {
				let route = this.activatedRoute;
				while (route.firstChild) route = route.firstChild;
				return route;
			}),
			filter((route) => route.outlet === 'primary'),
			mergeMap((route) => route.data),
			map((data) => {
				if ( !data.title ) {
					data.title = this.router.url.split('/').reduce((acc, frag) => {
						if ( acc && frag ) { acc += SEPARATOR; }
						return acc + TitleService.ucFirst(frag);
					});
				}
				return data;
			})
		).subscribe((data) => {
			this.titleService.setTitle(  this.app_title + SEPARATOR + data.title )
		})
	}

	static ucFirst(string) {
		if ( !string ) { return string; }
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}