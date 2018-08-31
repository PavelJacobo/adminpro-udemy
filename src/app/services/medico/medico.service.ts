import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {
    this.totalMedicos = 0;
  }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(map((res: any) => {
      this.totalMedicos = res.total;
      return res.medicos;
    }));

  }

  cargarMedico(id) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
              .pipe(map((res: any) => res.medico));
  }

  buscarMedicos( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).pipe(map((res: any) => {
      return res.medicos;
    }));
 }

 borrarMedico(id: string) {
  let url = URL_SERVICIOS + '/medico/' + id;
  url += '?token=' + this._usuarioService.token;

  return this.http.delete( url )
            .pipe(map((res: any) => {
              Swal('Medico borrado correctamente', res.medico.nombre, 'success');
              return res;
            }));
 }

 guardarMedico( medico: Medico) {
   let url = URL_SERVICIOS + '/medico';


   if (medico._id) {
    // actualizando

  url += '/' + medico._id;
  url += '?token=' + this._usuarioService.token;
    return this.http.put( url, medico)
               .pipe(map((res: any) => {
                Swal('Medico creado correctamente', medico.nombre, 'success');
                return res.medico;
               }));

   } else {
    // creando

      url += '?token=' + this._usuarioService.token;
     return this.http.post(url, medico).pipe(map((res: any) => {
       Swal('Medico creado correctamente', medico.nombre, 'success');
        return res.medico;
     }));

   }
 }
}
