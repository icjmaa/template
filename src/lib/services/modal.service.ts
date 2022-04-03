import { Component, Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

interface Callback {
	enable?: boolean,
	label?: String,
	icon?: String,
	class?: String,
	function?(objeto: any): void
}

interface CloseCallback {
	enable?: boolean,
	label?: String,
	icon?: String,
	class?: String,
	function?(objeto: any): void
}

@Injectable({
	providedIn: 'root'
})

export class ModalService {
	public visible: boolean = false;

	public callback: Callback;
	public close_callback: CloseCallback;

	public title : string = 'Title default';
	public msg : string = 'Message default';
	public viewContainerRef : ViewContainerRef;
	public refComponent = null;
	public is_closeable : boolean = true;

	public type: number = 1;
	public data: any = null;

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver
	) {
		this.setCallbacks()
	}

	info(title: string, msg: string, callback: Callback = this.callback, close_callback: CloseCallback = this.close_callback): void {
		this.show(title, msg, callback, close_callback, 1);
	};

	option(title: string, msg: string, callback: Callback, close_callback?: CloseCallback): void {
		this.show(title, msg, callback, close_callback, 2);
	};

	component(title: string, component: any, data_component: any = null, callback: Callback = this.callback, close_callback:CloseCallback = this.close_callback): void {
		this.show(title, component, callback, close_callback, 3, data_component);
	}

	private show(title: string, body: any | string, callback: Callback, close_callback: CloseCallback, type = 1, data_component = null): void {
		this.visible = true;
		this.title = title;
		this.viewContainerRef.clear();
		if ( typeof body === 'string') {
			this.msg = body;
		}else{
			this.data = data_component;
			const factory = this.componentFactoryResolver.resolveComponentFactory(body);
			this.refComponent = this.viewContainerRef.createComponent(factory);
			this.refComponent.changeDetectorRef.detectChanges();
		}

		Object.assign(this.callback, callback);
		Object.assign(this.close_callback, close_callback);

		this.type = type
	}

	execCallback(objeto: any): void {
		this.callback.function(objeto);
		if ( this.is_closeable ) {
			this.visible = false;
		}
		this.resetCallbacks()
	}

	execCloseCallback(objeto: any): void {
		this.close_callback.function(objeto);
		if ( this.is_closeable ) {
			this.visible = false;
		}
		this.resetCallbacks()
	}

	private resetCallbacks(): void {
		this.setCallbacks()
	}

	private setCallbacks(): void {
		this.callback = {
			enable: true,
			label: 'Guardar',
			icon: 'fa fa-download',
			class: 'info',
			function: (objeto: any) => {
				console.log("Callback Function default");
			}
		}
		this.close_callback = {
			enable: true,
			label: 'Cancelar',
			icon: 'fa fa-times',
			class: 'error',
			function : (objeto: any) => {
				console.log("CloseCallback Function default");
				this.visible = false;
			}
		}
	}
}
