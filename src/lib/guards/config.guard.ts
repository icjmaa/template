import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorService } from './../services/error.service';

@Injectable({
	providedIn: 'root'
})
export class ConfigGuard implements CanActivate {
	private environment = ''
	constructor(
		public router: Router,
		public errors : ErrorService,
		@Inject('env') private env
	){
		this.environment = env;
	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
	{
		let objEnv = JSON.parse( JSON.stringify(this.environment) );
		if ( !objEnv.production ) {
			if ( !this.environment.hasOwnProperty('apiUrl') ) {
				this.errors.setError("No se ha especificado apiUrl en environment.");
			}
			if ( !this.environment.hasOwnProperty('appTitle') ) {
				this.errors.setError("No se ha especificado appTitle en environment.");
			}
			if ( !this.environment.hasOwnProperty('socketIoConfig') ) {
				this.errors.setError("No se ha especificado socketIoConfig en environment.");
			}
			if ( this.errors.getErrors().length ) {
				this.router.navigate(['/error']);
				return false;
			}
		}
		return true;
	}
}
