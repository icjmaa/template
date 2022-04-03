import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	public status : boolean = false;
	public label : string = 'Cargando...'
	public background : string = 'rgba(0, 0 ,0, 0.64)'
	public isTotalNot : boolean = false;

	constructor() { }

	public show(){
		this.status = true;
	}

	public hidden(){
		this.status = false;
	}

	public isVisble() : boolean{
		return this.status;
	}
}
