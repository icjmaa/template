import { Injectable } from '@angular/core';
import { FileSaverService } from './FileSaver.service'

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const PDF_TYPE = 'application/pdf';
const XML_TYPE = 'application/xml';
const ZIP_TYPE = 'application/zip';

@Injectable({
	providedIn: 'root'
})
export class DownloadService {

	constructor(
		private fileSaver: FileSaverService
	) { }

	download(data: any, name: string = null, type: string, base64ToBlob: boolean = true) {
		name = (!name) ? new  Date().getTime() + '.' + type : name;
		data = ( base64ToBlob ) ? this.base64ToBlob( data ) : data ;
		this.fileSaver.saveAs( new Blob( [ data ], this.getMimeType(type) ), name );
	}

	base64ToBlob(base64: string) {
		let byteCharacters = atob(base64);
		let byteNumbers = new Array(byteCharacters.length);
		for (var i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		return new Uint8Array(byteNumbers);
	}

	getMimeType(type: string): any {
		let mimeType = null;
		switch (type.toLowerCase().replace('.', '')) {
			case 'pdf':
				mimeType = { type : PDF_TYPE }
				break;
			case 'xlsx':
			case 'xls':
			case 'xls':
				mimeType = { type : EXCEL_TYPE }
				break;
			case 'xml':
				mimeType = { type : XML_TYPE }
				break;
			case 'zip':
				mimeType = { type : ZIP_TYPE }
				break;
			default:
				mimeType = { type : ''}
				break;
		}
		return mimeType;
	}
}