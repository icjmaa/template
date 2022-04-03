import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
	selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewInit {

	constructor(private el: ElementRef) {}

	ngAfterViewInit() {
		setTimeout(() => {
			this.el.nativeElement.focus();
		}, 64);
	}
}
