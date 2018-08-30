import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  public desde: number;
  public totalRegistros: number;
  public cargando: boolean;
  constructor(
     public _usuarioService: UsuarioService,
     public _modalUploadService: ModalUploadService
  ) {
    this.desde = 0;
    this.totalRegistros = 0;
    this.cargando = true;
  }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe((res) => this.cargarUsuarios());
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
  this.cargando = true;
  this._usuarioService.cargarUsuarios( this.desde )
                      .subscribe( (res: any) => {
                        this.totalRegistros = res.total;
                        this.usuarios = res.usuarios;
                        this.cargando = false;
                      });
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    console.log( desde );

    if ( desde >= this.totalRegistros ) {
      return;
    }
    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario ( termino: string ) {
    if (termino === '') {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          this.cargando = false;
      });
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioService.usuario._id) {
    Swal('Error al borrar usuario', 'No se puede borrar a si mismo', 'error');
    return;
    }

    Swal({
      title: '¿Estás Seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
            .subscribe((res) => {
              console.log(res);
              this.cargarUsuarios();
              Swal(
                'Borrado!',
                'El Usuario ha sido borrado',
                'success'
              );
            });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelado',
          'El usuario No ha sido borrado',
          'error'
        );
      }
    });
  }

  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario )
          .subscribe();
  }

}
