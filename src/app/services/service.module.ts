import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  LoginGuardGuard,
  HospitalService,
  MedicoService } from './service.index';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

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
    SidebarService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
