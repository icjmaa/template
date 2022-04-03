import { Component, OnInit } from '@angular/core';
import { DebugService } from './../../services/debug.service';

@Component({
	selector: 'log-area',
	templateUrl: './log.component.html',
	styles: []
})
export class LogComponent implements OnInit {

	constructor(
		private debug : DebugService
	) { }

	ngOnInit() {
	}

	getLog(){
		return this.debug.getLog();
	}

	clearLog(){
		this.debug.clearLog()
	}

	show_log(){
		return this.debug.show_log();
	}
}
