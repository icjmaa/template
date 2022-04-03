import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { SessionManager } from '../classes/session-manager' 


@Injectable({
	providedIn: 'root'
})
export class SessionService {
	sessionChange: Subject<boolean> = new Subject<boolean>();
	head : any = ''
	payload : any = '';
	auth : string = '';

	private sessionManager = null;
	constructor(
		@Inject(DOCUMENT) private doc,
		@Inject('env') private env
	) {
		this.sessionManager = new SessionManager( env.sessionManager || null );
		this.auth = this.sessionManager.getItem(this.env.appTitle);
		this.fromToken();
	}

	fromToken(){
		if (!this.auth){
			this.head = '';
			this.payload = '';
			return;
		}
		let data = this.auth.split(".");
		this.head = JSON.parse(atob(decodeURIComponent(data[0])));
		this.payload = JSON.parse(atob(decodeURIComponent(data[1])));
	}

	getToken(){
		if (!this.auth) {
			return '';
		}
		if (this.head.expires < parseInt( (new Date().getTime() / 1000).toFixed(0) ) ){
			this.delete();
		}
		return this.sessionManager.getItem(this.env.appTitle)
	}

	setToken(auth: string){
		this.auth = auth;
		this.sessionManager.setItem( this.env.appTitle , this.auth );
		this.sessionChange.next(true);
		this.fromToken();
	}

	delete(){
		this.auth = '';
		this.fromToken();
		this.sessionManager.removeItem( this.env.appTitle );
		this.sessionChange.next(true);
	}

	isSet(){
		return (!!this.getToken());
	}

	getPayload(){
		return this.payload;
	}
}
