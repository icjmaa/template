var global = global || window
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class FileSaverService {

	constructor() {}

	private _global: any = (typeof window === 'object' && window.window === window)
	? window : (typeof self === 'object' && self.self === self)
	? self : (typeof global === 'object' && global.global === global)
	? global
	: null

	private bom (blob, opts):any {
		if (typeof opts === 'undefined') opts = { autoBom: false }
		else if (typeof opts !== 'object') {
			console.warn('Deprecated: Expected third argument to be a object')
			opts = { autoBom: !opts }
		}

		if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
			return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
		}
		return blob
	}

	private download (url, name, opts): void {
		var xhr = new XMLHttpRequest()
		xhr.open('GET', url)
		xhr.responseType = 'blob'
		xhr.onload = () => {
			this.saveAs(xhr.response, name, opts)
		}
		xhr.onerror = () => {
			console.error('could not download file')
		}
		xhr.send()
	}

	private corsEnabled (url): any {
		var xhr = new XMLHttpRequest()

		xhr.open('HEAD', url, false)
		try {
			xhr.send()
		} catch (e) {}
		return xhr.status >= 200 && xhr.status <= 299
	}


	private click (node): void {
		try {
			node.dispatchEvent(new MouseEvent('click'))
		} catch (e) {
			var evt = document.createEvent('MouseEvents')
			evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null)
			node.dispatchEvent(evt)
		}
	}

	private isMacOSWebView() {
		return this._global.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent)
	}

	public saveAs(blob, name, opts?, popup?) {
		const nav = (window.navigator as any);
		if (typeof window !== 'object' || window !== this._global) {

		} else if ('download' in HTMLAnchorElement.prototype && !this.isMacOSWebView()) {
			console.log("Algo")
			var URL = this._global.URL || this._global.webkitURL
			var a = document.createElement('a')
			name = name || blob.name || 'download'

			a.download = name
			a.rel = 'noopener'

			// a.target = '_blank'

			if (typeof blob === 'string') {

				a.href = blob
				if (a.origin !== location.origin) {
					this.corsEnabled(a.href)
						? this.download(blob, name, opts)
						: this.click(a)
				} else {
					this.click(a)
				}
			} else {
				a.href = URL.createObjectURL(blob)
				setTimeout(
					() => {
						URL.revokeObjectURL(a.href)
					}, 4E4
				); // 40s
				setTimeout(
					() => {
						window.open(URL.createObjectURL(blob), '_blank')
					}, 0
				);
			}
		} else if ('msSaveOrOpenBlob' in nav && nav.msSaveOrOpenBlob !== undefined && typeof nav.msSaveOrOpenBlob === 'function') {
			name = name || blob.name || 'download'

			if (typeof blob === 'string') {
				if (this.corsEnabled(blob)) {
					this.download(blob, name, opts)
				} else {
					var a = document.createElement('a')
					a.href = blob
					a.target = '_blank'
					setTimeout(() => {
							this.click(a)
						}
					);
				}
			} else {
				nav.msSaveOrOpenBlob(this.bom(blob, opts), name)
			}
		} else {
			popup = popup || open('', '_blank')
			if (popup) {
				popup.document.title =
				popup.document.body.innerText = 'downloading...'
			}

			if (typeof blob === 'string') return this.download(blob, name, opts)

			var force = blob.type === 'application/octet-stream'
			var isSafari = /constructor/i.test(this._global.HTMLElement) || this._global.safari
			var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)

			if ((isChromeIOS || (force && isSafari) || this.isMacOSWebView()) && typeof FileReader !== 'undefined') {
				var reader = new FileReader()
				reader.onloadend = () => {
					var url = reader.result
					url = isChromeIOS ? url : url.toString().replace(/^data:[^;]*;/, 'data:attachment/file;')
					if (popup) {
						popup.location.href = url
					} else {
						this._global.location = url
					}
					popup = null
				}
				reader.readAsDataURL(blob)
			} else {
				var URL = this._global.URL || this._global.webkitURL
				var url = URL.createObjectURL(blob)
				if (popup) popup.location = url
				else location.href = url
				popup = null
				setTimeout(() => {
						URL.revokeObjectURL(url)
					}, 4E4 // 40s
				)
			}
		}
	}
}