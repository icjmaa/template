import { Injectable, Inject } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DebugService {
	private active : boolean = false;
	private log = '';

	constructor(
		@Inject('env') private env
	) {
		this.active = !this.env.production === true || this.env.outside === true;
		eval("window.debug = this");
		if (env.production === true || this.env.outside) {
			this.showBlockConsole();
		}
	}

	isActive() : boolean{
		return this.active;
	}

	activate() : void{
		this.active = true;
	}

	addLog(log : any) : void{
		this.log += "\n" + log;
	}

	getLog() : string{
		return this.log;
	}

	clearLog() : void{
		this.log = '';
	}

	show_log() : boolean{
		return (this.env.production || this.env.outside) && this.env.active;
	}

	private showBlockConsole(){
		let url = 'assets/img/logo-totalnot.png';
		let image = new Image();

		image.onload = function() {
			// Inside here we already have the dimensions of the loaded image
			var style = [
				// Hacky way of forcing image's viewport using `font-size` and `line-height`
				'font-size: 1px;',
				'background-repeat: no-repeat;',
				'line-height: ' + image.height + 'px;',

				// Hacky way of forcing a middle/center anchor point for the image
				'padding: ' + image.height * .5 + 'px ' + image.width * .5 + 'px;',

				// Set image dimensions
				'background-size: ' + image.width + 'px ' + image.height + 'px;',

				// Set image URL
				'background-image: url('+ url +');'
			 ].join(' ');

			// notice the space after %c
			console.log("%c ", style);
		};
		// Actually loads the image
		image.src = url;
	}
}
