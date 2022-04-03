import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'lib-template',
	template: `
		<p>
			template works!
		</p>
	`,
	styles: []
})
export class TemplateComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

	public showErrors(){
	}
}
