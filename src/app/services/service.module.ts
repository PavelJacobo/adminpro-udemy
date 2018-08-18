import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard } from './service.index';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    SidebarService
  ],
  declarations: []
})
export class ServiceModule { }
