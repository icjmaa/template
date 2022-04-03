import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

import { SessionService } from './session.service';

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {
	
	constructor(
		@Inject(DOCUMENT) private document: any,
		@Inject('env') private env,
		private session: SessionService,
		private router : Router)
	{
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

		const authReq = req.clone({
			headers: (this.session.isSet()) ? new HttpHeaders({
				'Authorization' : this.session.getToken()
			}) : new HttpHeaders({})
		});

		return next.handle(authReq).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse){
						let auth = event.headers.get("Authorization");
						if (!!auth && auth !== this.session.getToken()){
							this.session.setToken(auth);
						}
					}
				},
				(error) => {
					switch ( error.status ) {
						case 301:
							//301 Movido Permanentemente
							break;
						case 400:
							//400 Bad Request
							break;
						case 401:
							//401 Unauthorized
						case 409:
							//409 Conflict
							this.session.delete();
							this.router.navigate(['/']);
							break;
						case 403:
							//403 Forbidden
							if ( this.env.hasOwnProperty('Forbidden') ) {
								this.router.navigate([ this.env.Forbidden ]);
							}
							break;
						case 404:
							//404 Not Found
							if ( this.env.hasOwnProperty('NotFound') ) {
								this.router.navigate([ this.env.NotFound ]);
							}
							break;
						case 405:
							//405 Method Not Allowed
							break;
						case 406:
							//406 Not Acceptable
							break;
						case 408:
							//408 Request Timeout
							break;
						case 411:
							//411 Length Required
							break;
						case 418:
							//418 I'm a teapot
							break;
						case 501:
							//501 Not Implemented
							break;
						case 500:
							//500 Internal Server Error
							break;
						case 502:
							//502 Bad Gateway
							break;
						case 503:
							//503 Service Unavailable
							break;
						case 504:
							//504 Gateway Timeout
							break;
						default:
							break;
					}
				}
			)
		);
	}
}