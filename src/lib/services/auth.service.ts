import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isSignedInChange: Subject<boolean> = new Subject<boolean>();
	constructor(
		private session: SessionService,
		private api: ApiService,
		private router: Router
	) { }

	public subjectChange() {
		this.isSignedInChange.next(this.isSignedIn());
	}

	public isSignedIn(): boolean{
		return !!this.session.getToken();
	}

	public getPayload(){
		return this.session.getPayload();
	}
}
