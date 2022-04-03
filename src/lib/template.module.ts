import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Dependencias
import { ToastrModule } from 'ngx-toastr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

//Componentes
import { TemplateComponent } from './template.component';
import { ErrorComponent } from './components/error/error.component';
import { DebugComponent } from './components/debug/debug.component';
import { LogComponent } from './components/log/log.component';

//Services
import { ApiService } from './services/api.service'
import { SessionService } from './services/session.service'
import { AuthService } from './services/auth.service'
import { TitleService } from './services/title.service'
import { SocketService } from './services/socket.service'
import { DebugService } from './services/debug.service';
import { HttpServiceInterceptor } from './services/http-service-interceptor'

//Classes
import { ToastrConfig } from './classes/toastr-config';

//Guards
import { ConfigGuard } from './guards/config.guard'
import { ErrorGuard } from './guards/error.guard';
import { DebugGuard } from './guards/debug.guard'

import { LoadingComponent } from './components/loading/loading.component'

//Directivas
import { InputTypeDirective } from './directives/InputType.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { FocusSelectDirective } from './directives/focus-select.directive';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
	declarations: [TemplateComponent, ErrorComponent, LoadingComponent, InputTypeDirective, DebugComponent, AutofocusDirective, FocusSelectDirective, LogComponent, ModalComponent ],
	imports: [
		BrowserModule,
		ToastrModule.forRoot(),
		SocketIoModule.forRoot(TemplateModule.socketIoConfig),
		RouterModule.forRoot(TemplateModule.routes)
	],
	exports: [
		TemplateComponent,
		LoadingComponent,
		ErrorComponent,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		InputTypeDirective,
		DebugComponent,
		ModalComponent,
		AutofocusDirective,
		FocusSelectDirective,
		LogComponent,
		RouterModule
	],
	providers : []
})
export class TemplateModule {
	public static routes : Routes = [
		{
			path: 'error',
			component: ErrorComponent,
			canActivate : [
				ErrorGuard
			]
		},
		{
			path : '',
			children: [],
			canActivate : [
				ConfigGuard
			]
		},
		{
			path : '**',
			redirectTo : '',
		}
	];


	public static socketIoConfig : SocketIoConfig = {
		url: 'http://localhost:8988',
		options: {}
	};

	public static forRoot(environment: any, rutasApp: Routes): ModuleWithProviders<TemplateModule> {
		//TemplateModule.showBlockConsole( environment );
		TemplateModule.setRutas(rutasApp, environment);
		return {
			ngModule: TemplateModule,
			providers: [
				DebugService,
				ApiService,
				HttpServiceInterceptor,
				TitleService,
				SessionService,
				AuthService,
				SocketService,
				ConfigGuard,
				DebugGuard,
				{
					provide: 'env',
					useValue: environment
				},
				{
					provide : HTTP_INTERCEPTORS,
					useClass : HttpServiceInterceptor,
					multi :true
				}
			]
		};
	}


	public static setRutas(rutasApp: Routes, environment){
		TemplateModule.routes[1].children = rutasApp;
		TemplateModule.socketIoConfig.url = environment.socketIoConfig.url;
		TemplateModule.socketIoConfig.options = environment.socketIoConfig.options;
	}
}