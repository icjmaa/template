import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
	selector: '.input-material',
	providers: [NgModel]
})
export class InputTypeDirective {

	constructor(
		private el: ElementRef,
		private ngModel : NgModel
	) {
	}
	
	@HostListener('keydown', ['$event'])
	onKeyDown(event: KeyboardEvent) {
		let type = this.el.nativeElement.children[0].type;
		let pattern = this.el.nativeElement.children[0].pattern;
		let name = this.el.nativeElement.children[0].name;
		let value = this.el.nativeElement.children[0].value;
		let key = event.key;
		
		if (key == 'Backspace' || key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Tab' || key == 'ArrowUp' || key == 'ArrowDown') {
			return true;
		}
		if (type == 'number') {
			let key_valid = 0;
			let value_valid = false;
			//Primero validamos el key
			if (new RegExp(/[0-9|.]/).test(key)) {
				key_valid = (key == '.' && value.indexOf(".") > -1) ? 0 : 1;
			}
			//Luego validamos el value
			if (value == '') {
				value_valid = true
			}else{
				if (new RegExp(/[0-9]+([\.][0-9]{1,2})?/).test(value)) {
					value_valid = true
				}
			}
			if (key_valid && value_valid) {
				return true
			}else{
				event.preventDefault();
			}
		}else if(type == 'text' && name != 'email' ){
			if (pattern == '') {
				return true;
			}
			if (name == 'rfc' || name == 'curp') {
				pattern = '[a-zA-ZñÑ\x260-9]'
			}else if( name == 'name' ){
				pattern = '[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]+'
				if (key == ' ') {
					return true;
				}
			}else if( name == 'phone' ){
				pattern = '[0-9]'
			}else if( name == 'decimal' ){
				if ( key == '.' &&  value.indexOf('.') != -1 ) {
					event.preventDefault();
				}
				pattern = '[0-9|\.]';
			}
			if (new RegExp(pattern).test(key) == false) {
				event.preventDefault();
			}else{
				return true;
			}
		}
	}

	/*@HostListener("input", ["$event"])
	handleInput(event: any) {
		console.log("Input event.");
		if (!this.isChromeAndroid()) {
			console.log("START handler Input");
			let type = this.el.nativeElement.children[0].type;
			let pattern = this.el.nativeElement.children[0].pattern;
			let name = this.el.nativeElement.children[0].name;
			//let prevValue = this.el.nativeElement.children[0]['prev-value']
			let value = this.el.nativeElement.children[0].value;
			let key = event.data;

			if ( type == 'text' ) {
				console.log(event);
				console.log(key);
				console.log(pattern);
				console.log( new RegExp(pattern).test(key) );
				if (new RegExp(pattern).test(key) == false) {
					console.log(this.ngModel);
					this.ngModel.update.emit("#");
					event.preventDefault();
				}else{
					return true;
				}
			}
			console.log("END handler Input");
		}
	}*/

	isChromeAndroid(): boolean {
		return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
	}
}
