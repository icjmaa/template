import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
	selector: 'loading',
	templateUrl: './loading.component.html',
	styles: []
})
export class LoadingComponent {
	constructor(
		public loading : LoadingService
	) { }
}
