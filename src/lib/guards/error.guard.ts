import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorService } from './../services/error.service'

@Injectable({
	providedIn: 'root'
})
export class ErrorGuard implements CanActivate {
	constructor(
		private router : Router,
		private error : ErrorService
	){}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
	{
		if ( !this.error.getErrors().length ) {
			this.router.navigate(['']);
			return false;
		}
		return true;
	}
}
