import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DebugService } from './../services/debug.service'

@Injectable({
	providedIn: 'root'
})
export class DebugGuard implements CanActivate {
	constructor(
		private debug : DebugService
	){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
	{
		console.log(this.debug.show_log());
		console.log(this.debug.isActive());
		this.debug.activate();
		console.log(this.debug.isActive());
		console.log(this.debug.show_log());
		return true;
	}
}
