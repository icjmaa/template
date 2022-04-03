export class SessionManager {

	private manager = null;

	constructor(sessionManager){
		this.setManager(sessionManager);
	}

	public setManager( manager ){
		if (manager == 'sessionStorage') { 
			this.manager == sessionStorage;
		} else if (manager == 'localStorage'){
			if (typeof localStorage === undefined || localStorage === null) { 
				this.manager == sessionStorage;
			} else{
				this.manager = localStorage;
			}
		}else{
			this.manager = sessionStorage;
		}
	}

	setItem(key, value){
		this.manager.setItem(key, value);
	}

	getItem( key ){
		return this.manager.getItem(key);
	}

	removeItem(key){
		this.manager.removeItem(key);
	}

	clear(){
		this.manager.clear();
	}
}
