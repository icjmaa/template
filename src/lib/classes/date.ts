export class Date {
	/**
	 * [_unix_time description]
	 * @type {number}
	 */
	private _unix_time: number;
	/**
	 * [_string_fecha description]
	 * @type {string}
	 */
	private _string_fecha: string;
	/**
	 * [_string_hora description]
	 * @type {string}
	 */
	private _string_hora: string;
	/**
	 * [_horario_verano description]
	 * @type {boolean}
	 */
	private _horario_verano: boolean;

	/**
	 * [constructor Fecha en formato UnixTime, "DD-MM-YYYY" o "YYYY-MM-DD" o una instancia de window.Date]
	 * @param {any = null} date      [Fecha en formato UnixTime, "DD-MM-YYYY" o "YYYY-MM-DD" o una instancia de window.Date]
	 * @param {any = null} modifiers [description]
	 */
	constructor(date: any = null, modifiers: any = null){
		if ( !!date && typeof date === 'object' && !(date instanceof window.Date) ) {
			Object.entries(date).forEach(
				(element) => {
					const [key, value] = element;
					this[ '_' + key ] = value;
				}
			);
		} else if( typeof date === 'number' || typeof date === 'string' || date instanceof window.Date) {
			this.setDate(date, modifiers);
		} else {
			this.setDate( window.Date.now() / 1000 );
		}
	}

	/**
	 * [string_fecha description]
	 * @return {string} [description]
	 */
	public get string_fecha() : string {
		return this._string_fecha; 
	}

	/**
	 * [string_fecha description]
	 * @param {string} value [description]
	 */
	public set string_fecha(value : string) {
		if ( /^(\d{4}-\d{2}-\d{2})|(\d{2}-\d{2}-\d{4})|(\d{2}\/\d{2}\/\d{4})$/.test(value)) {
			this.setDate(value);
		} else {
			console.error( value + " No es un valor valido para la propiedad 'string_fecha' usa el formato DD-MM-YYYY, YYYY-MM-DD o DD/MM/YYYY");
		}
	}

	/**
	 * [unix_time description]
	 * @return {number} [description]
	 */
	public get unix_time() : number | string {
		return this._unix_time; 
	}

	/**
	 * [unix_time description]
	 * @param {number} value [description]
	 */
	public set unix_time(value : number | string) {
		if (/^\d{10}$/.test(value.toString())) {
			this.setDate(parseInt(value.toString()));
		} else {
			console.error( value + " No es un valor valido para la propiedad 'unix_time'");
		}
	}

	/**
	 * [string_hora description]
	 * @return {string} [description]
	 */
	public get string_hora(): string {
		return this._string_hora;
	}

	/**
	 * [string_hora description]
	 * @param {string} value [description]
	 */
	public set string_hora(value: string) {
		if (/^\d{2}\:\d{2}\:\d{2}$/.test(value)) {
			this.setDate(this._string_fecha + ' ' + value);
		} else {
			console.error( value + " No es un valor valido para la propiedad 'string_hora' se recomienda usar el formato HH:MM:SS" );
		}
	}

	/**
	 * [getDate description]
	 * @return {string} [description]
	 */
	public getDate(): string{
		let date = Date.getNativeDate(this._unix_time * 1000);
		return [date.getDate().toString().padStart(2, '0'), (date.getMonth() + 1).toString().padStart(2, '0'), date.getFullYear()].join('-');
	}

	/**
	 * [getTime description]
	 * @return {string} [description]
	 */
	public getTime(): string{
		let date = Date.getNativeDate(this._unix_time * 1000);
		return [date.getHours().toString().padStart(2, '0'), date.getMinutes().toString().padStart(2, '0'), date.getSeconds().toString().padStart(2, '0')].join(':');
	}

	/**
	 * [getNativeDate description]
	 * @param  {[type]} ...args [description]
	 * @return {any}            [description]
	 */
	public static getNativeDate( ...args ): any{
		args.unshift(null);
		return new (Function.prototype.bind.apply(window.Date, args));
	}

	/**
	 * [setDate description]
	 * @param {any}        date      [Fecha en formato UnixTime, "DD-MM-YYYY" o "YYYY-MM-DD" o una instancia de window.Date]
	 * @param {any = null} modifiers [description]
	 */
	public setDate(date : any, modifiers: any = null) : void {
		if( typeof date === 'number' ) {
			date =  parseInt(date.toString());
		} else if( date instanceof window.Date ) {
			date = Math.round(date.getTime() / 1000);
		} else {
			date = date.trim();
		}
		if( !!modifiers ){
			if( typeof date === 'number' ){
				this._unix_time = this.strtotime(Date.getNativeDate(date * 1000).toLocaleString() + ' ' + modifiers );
			}else{
				this._unix_time = this.strtotime(date + ' ' + modifiers);
			}
		}else{
			this._unix_time = typeof date === 'number' ? date : this.strtotime(date);
		}
		this._string_fecha = this.getDate();
		this._string_hora =  this.getTime();
		this._horario_verano = this.isDst(Date.getNativeDate(this._unix_time * 1000));
	}

	/**
	 * [strtotime description]
	 * @param  {string} string [description]
	 * @return {number}        [description]
	 */
	private strtotime( string: string ): number{
		let regex = /^(\d{2})-(\d{2})-(\d{4})[\T|\s]?(\d{1,2}\:\d{1,2}\:\d{1,2})?(0Z)?$/
		if ( regex.test(string) ) {
			if ( string.match(regex)[4] == undefined ) {
				string = string.replace( regex, "$3-$2-$1 00:00:00")
			}else if( string.match(regex)[4] != undefined  ) {
				string = string.replace( regex, "$3-$2-$1 $4")
			}
		}
		let date = Date.getNativeDate(string);
		return Math.round(date.getTime() / 1000);
	}

	/**
	 * [isDst description]
	 * @param {any} date [description]
	 */
	private isDst( date: any ) {
		let jan = Date.getNativeDate(date.getFullYear(), 0, 1);
		let jul = Date.getNativeDate(date.getFullYear(), 6, 1);
		let std = Math.max( jan.getTimezoneOffset(), jul.getTimezoneOffset() );
		return date.getTimezoneOffset() < std;
	}
}

Date.prototype.toString = function dateToString() {
	return this._string_fecha;
}

Date.prototype.valueOf = function dateToJson(){
	return { 
		unix_time : this._unix_time,
		string_fecha: this._string_fecha,
		string_hora: this._string_hora,
		horario_verano: this._horario_verano
	}
}
