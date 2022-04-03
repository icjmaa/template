import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appFocusSelect], [currencyMask]'
})
export class FocusSelectDirective {

	constructor() { }

	@HostListener('focus', ['$event'])
	onFocus(element){
		element.srcElement.selectionStart = 0;
		element.srcElement.selectionEnd = element.srcElement.value.length;
	}
}
