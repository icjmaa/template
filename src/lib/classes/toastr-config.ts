export class ToastrConfig {
	timeOut = 5000;
	easing = 'ease-in';
	progressBar = true;
	closeButton = true;
	positionClass = 'toast-bottom-right';

	constructor( 
		timeOut : number = 5000,
		easing : string = 'ease-in',
		progressBar : boolean = true,
		closeButton : boolean = true,
		positionClass : string = 'toast-bottom-right'
	){
		this.timeOut = timeOut;
		this.easing = easing;
		this.progressBar = progressBar;
		this.closeButton = closeButton;
		this.positionClass = positionClass;
	}
}
