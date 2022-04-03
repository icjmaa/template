import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { TitleService } from './title.service';
@Injectable({
	providedIn: 'root'
})
export class SocketService {

	private subject = new Subject<any>();

	constructor(private socket: Socket, private api: ApiService, private title : TitleService) {
		this.api.get('SOCKET').subscribe( (res) => {});
		this.socket.on('update', (msg) => {
			let response = JSON.parse(msg);
			if (response.app == this.title.app_title) {
				this.subject.next(response)
			}
		});
	}

	getSubject(): Observable<any> {
		return this.subject.asObservable();
	}

	confirmacion(id_user : number){
		let data = JSON.stringify(
			{
				id : id_user,
				app_title : this.title.app_title
			}
		);
		this.socket.emit('confirmacion', data);
	}

	getUsuarios(){
		let data = JSON.stringify(
			{ app_title : this.title.app_title}
		);
		this.socket.emit('getUsuarios', data);
	}
}