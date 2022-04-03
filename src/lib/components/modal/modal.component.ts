import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ModalService } from './../../services/modal.service'

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit{
	@ViewChild('bodyModal', { read: ViewContainerRef, static: true }) viewContainerRef : ViewContainerRef;
	constructor(
		public modal : ModalService
	) { }

	ngOnInit(){
		this.modal.viewContainerRef = this.viewContainerRef;
	}
}
