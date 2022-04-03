import { Component, OnInit } from '@angular/core';
import { ErrorService } from './../../services/error.service';
@Component({
	selector: 'lib-error',
	templateUrl: './error.component.html',
	styleUrls : []
})
export class ErrorComponent implements OnInit {
	constructor(
		public errors : ErrorService
	) { }

	ngOnInit() {
	}
}
