import { Component, OnInit } from '@angular/core';
import { DebugService } from './../../services/debug.service';

@Component({
	selector: 'debug',
	templateUrl: './debug.component.html',
	styles: []
})
export class DebugComponent implements OnInit {

	constructor(
		private debug : DebugService
	) { }

	ngOnInit() {
	}

	isActive(){
		return this.debug.isActive();
	}
}
