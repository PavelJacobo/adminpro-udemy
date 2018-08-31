import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );

  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe(map((res: any) => res.hospital));
  }

  borrarHospital( id: string ) {
    console.log(id);
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url);
  }

  crearHospital( nombre: string ) {
    const hospital = new Hospital(
      nombre,
      null,
      this._usuarioService.usuario._id
    );
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, hospital);
  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(map((res: any) => {
      return res.hospitales;
    }));
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, hospital).pipe(map((res: any) => res.hospital));
  }
}
