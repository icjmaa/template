export class Fechas {
	/**
	 * [_null description]
	 * @type {number}
	 */
	private _nullable: boolean;
	/**
	 * [_unixTime description]
	 * @type {number}
	 */
	private _unixTime: number;
	/**
	 * [_string_fecha description]
	 * @type {string}
	 */
	private _stringFecha: string;
	/**
	 * [_string_hora description]
	 * @type {string}
	 */
	private _stringHora: string;
	/**
	 * [_horario_verano description]
	 * @type {boolean}
	 */
	private _horarioVerano: boolean;

	/**
	 * [constructor Fecha en formato UnixTime, "DD-MM-YYYY" o "YYYY-MM-DD" o una instancia de window.Date]
	 * @param {any = null} date      [Fecha en formato UnixTime, "DD-MM-YYYY" o "YYYY-MM-DD" o una instancia de window.Date]
	 * @param {any = null} modifiers [description]
	 */
	constructor(date: any = undefined, modifiers: any = null) {
		if ( !!date && typeof date === 'object' && !(date instanceof window.Date) ) {
			if (undefined !== date.unixTime && 'number' === typeof date.unixTime && /\d{10}/g.test(date.unixTime)) {
				this.setDate(date.unixTime);
			}
			Object.entries(date).forEach(
				(element) => {
					const [key, value] = element;
					let keys = ['_nullable', '_unixTime', '_stringFecha', '_stringHora', '_horarioVerano']
					if (-1 !== keys.indexOf('_' + key)) {
						this[ '_' + key ] = value;
					}
				}
			);
			if (date.nullable || undefined === date.unixTime || undefined === date.nullable) {
				this.setNull()
			}
		} else if( typeof date === 'number' || typeof date === 'string' || date instanceof window.Date) {
			this.setDate(date, modifiers);
		} else if (undefined === date) {
			this.setDate( window.Date.now() / 1000 );
		} else {
			this.setNull()
		}
	}


	/**
	 * [nullable description]
	 * @return {boolean} [description]
	 */
	public get nullable() : boolean {
		return this.nullable; 
	}

	/**
	 * [nullable description]
	 * @param {boolean} value [description]
	 */
	public set nullable(value : boolean) {
		if ( 'boolean' === typeof value ) {
			if (true === value) {
				this.setNull();
			}
		} else {
			console.error( value + " No es un valor valido para la propiedad 'nullable'");
		}
	}

	/**
	 * [unixTime description]
	 * @return {number} [description]
	 */
	public get unixTime() : number | string {
		return this._unixTime; 
	}

	/**
	 * [unixTime description]
	 * @param {number} value [description]
	 */
	public set unixTime(value : number | string) {
		if (/^\d{10}$/.test(value.toString())) {
			this.setDate(parseInt(value.toString()));
		} else {
			console.error( value + " No es un valor valido para la propiedad 'unix_time'");
		}
	}

	/**
	 * [stringFecha description]
	 * @return {string} [description]
	 */
	public get stringFecha() : string {
		return this._stringFecha; 
	}

	/**
	 * [stringFecha description]
	 * @param {string} value [description]
	 */
	public set stringFecha(value : string) {
		if ( /^(\d{4}-\d{2}-\d{2})|(\d{2}-\d{2}-\d{4})|(\d{2}\/\d{2}\/\d{4})$/.test(value)) {
			this.setDate(value);
		} else {
			console.error( value + " No es un valor valido para la propiedad 'string_fecha' usa el formato DD-MM-YYYY, YYYY-MM-DD o DD/MM/YYYY");
		}
	}

	/**
	 * [stringHora description]
	 * @return {string} [description]
	 */
	public get stringHora(): string {
		return this._stringHora;
	}

	/**
	 * [stringHora description]
	 * @param {string} value [description]
	 */
	public set stringHora(value: string) {
		if (/^\d{2}\:\d{2}\:\d{2}$/.test(value)) {
			this.setDate(this._stringFecha + ' ' + value);
		} else {
			console.error( value + " No es un valor valido para la propiedad 'string_hora' se recomienda usar el formato HH:MM:SS" );
		}
	}

	/**
	 * [getDate description]
	 * @return {string} [description]
	 */
	public getDate(): string{
		let date = Fechas.getNativeDate(this._unixTime * 1000);
		return [date.getDate().toString().padStart(2, '0'), (date.getMonth() + 1).toString().padStart(2, '0'), date.getFullYear()].join('-');
	}

	/**
	 * [getTime description]
	 * @return {string} [description]
	 */
	public getTime(): string{
		let date = Fechas.getNativeDate(this._unixTime * 1000);
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
				this._unixTime = this.strtotime(Fechas.getNativeDate(date * 1000).toLocaleString() + ' ' + modifiers );
			}else{
				this._unixTime = this.strtotime(date + ' ' + modifiers);
			}
		}else{
			this._unixTime = typeof date === 'number' ? date : this.strtotime(date);
		}
		if (date.nullable) {
			this.setNull()
		} else {
			this._nullable = false;
		}
		this._stringFecha = this.getDate();
		this._stringHora =  this.getTime();
		this._horarioVerano = this.isDst(Fechas.getNativeDate(this._unixTime * 1000));
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
		let date = Fechas.getNativeDate(string);
		return Math.round(date.getTime() / 1000);
	}

	/**
	 * [isDst description]
	 * @param {any} date [description]
	 */
	private isDst( date: any ) {
		let jan = Fechas.getNativeDate(date.getFullYear(), 0, 1);
		let jul = Fechas.getNativeDate(date.getFullYear(), 6, 1);
		let std = Math.max( jan.getTimezoneOffset(), jul.getTimezoneOffset() );
		return date.getTimezoneOffset() < std;
	}

	private setNull(){
		this._nullable = true
		this._unixTime = null
		this._stringFecha = null
		this._stringHora = null
		this._horarioVerano = null
	}

	toJSON(){
		return this.unixTime;
	}
}

Fechas.prototype.toString = function dateToString() {
	return this._stringFecha;
}

Fechas.prototype.valueOf = function dateToJson(){
	return { 
		nullable: this._nullable,
		unixTime: this._unixTime,
		stringFecha: this._stringFecha,
		stringHora: this._stringHora,
		horarioVerano: this._horarioVerano
	}
}
