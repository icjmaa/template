import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ErrorService {
	private errors : any[] = [];
	constructor() { }

	getErrors() : any[]{
		return this.errors;
	}

	setError( error : any ){
		this.errors.push(error);
	}
}
