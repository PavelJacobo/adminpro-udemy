import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: string | ArrayBuffer | null;

  constructor( public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) {

  }

  ngOnInit() {
  }

  subirImagen() {
     this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
         .then((res) => {

           this._modalUploadService.notificacion.emit( res ) ;
           this.cerrarModal();

         }).catch((err) => {
           console.log(err, 'Error en la carga...');
         });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      Swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
      this.imagenSubir = null;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

}
