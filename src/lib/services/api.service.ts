import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { map, finalize, catchError, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	private api_url = '';

	constructor(
		private http: HttpClient,
		private router: Router,
		@Inject('env') private env
	) {
		this.api_url = this.env.apiUrl;
	}

	public post(control, data, needHeader = false, time_out?: number) : Observable<any>{
		const options = this.getRequestOptions(needHeader);
		return this.getResponse( this.http
			.post(this.getUrlRequest(control), data, options), time_out );
	}

	public get(control, needHeader = false, time_out?: number) : Observable<any>{
		const options = this.getRequestOptions(needHeader);
		return this.getResponse( this.http
			.get(this.getUrlRequest(control), options), time_out );
	}

	public put(control, data, needHeader = false, time_out?: number) : Observable<any>{
		const options = this.getRequestOptions(needHeader);
		return this.getResponse( this.http
			.put(this.getUrlRequest(control), data, options), time_out );
	}

	public delete(control, needHeader = false, time_out?: number) : Observable<any>{
		const options = this.getRequestOptions(needHeader);
		return this.getResponse( this.http
			.delete(this.getUrlRequest(control), options), time_out );
	}

	private getResponse( request, time_out?: number ) : Observable<any> {
		if (time_out !== undefined && time_out !== null) {
			return request.pipe(
				timeout(time_out),
				finalize( () => {}),
				map(response => response),
				catchError(this.handleError.bind(this))
			)
		}
		return request.pipe(
			finalize( () => {}),
			map(response => response),
			catchError(this.handleError.bind(this))
		)
	}

	public requestExternal(url: string): URL{
		return new URL(url)
	}

	private getUrlRequest(control: URL | string): string{
		let isExternal = control instanceof URL
		return isExternal ? control.toString() : this.api_url + '/' + control;
	}

	private getRequestOptions(needHeader) {
		let headers = new HttpHeaders({});
		return { headers };
	}

	private handleError(error: Response | any) {
		error.__proto__.toString = () => {
			if ( error.hasOwnProperty( 'error' )) {
				return error.error.error || "Error desconocido :(";
			} else if (error instanceof TimeoutError) {
				return "TimeoutError";
			}	
			return 'Error desconocido :(';
		}
		return throwError(error);
	}
}
