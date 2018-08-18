import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import Swal from 'sweetalert2';
import { map } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
   }

   islogged() {
     return ( this.token.length > 5 ) ? true : false;
   }

  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

   guardarStorage(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario = usuario;
        this.token = token;
   }

   loginGoogle(token: string) {
      const url = URL_SERVICIOS + '/login/google';
      return this.http.post(url, { token })
                      .pipe(map((res: any) => {
                        this.guardarStorage(res.id, res.token, res.usuario);
                        return true;
                      }));
   }

   logout() {
     this.usuario = null;
     this.token = '';
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     this.router.navigate(['/login']);
   }

   login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );

    } else {
      localStorage.removeItem('email');
    }
      const url = URL_SERVICIOS + '/login';
      return this.http.post(url, usuario)
      .pipe(map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      }));
   }

   crearUsuario ( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
     return this.http.post(url, usuario)
     .pipe(map((res: any) => {
      Swal('Usuario creado correctamente', usuario.email, 'success');
       return res.usuario;
     }));
   }

   actualizarUsuario( usuario: Usuario ) {
     let url = URL_SERVICIOS + '/usuario/' + usuario._id;
     url += '?token=' + this.token;
     return this.http.put( url, usuario ).pipe(map(( res: any ) => {
        // this.usuario = res.usuario;
        const usuarioDB: Usuario = res.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        Swal('Usuario actializado', usuario.nombre, 'success');
        return true;
     }));
   }

   cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
                             .then((res: any) => {
                                this.usuario.img = res.usuario.img;
                                Swal('Imagen actualizada', this.usuario.nombre, 'success');
                                this.guardarStorage(id, this.token, this.usuario );
                             })
                             .catch((res: any) => {
                                console.log(res);
                             });
   }
}
