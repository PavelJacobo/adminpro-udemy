import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public desde: number;
  public totalRegistros: number;
  public cargando: boolean;
  public nombreHospital: any;

  constructor(
          public _hospitalService: HospitalService,
          public _modalUploadService: ModalUploadService
  ) {

    this.desde = 0;
    this.totalRegistros = 0;
    this.cargando = true;
    this.nombreHospital = '';
  }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe((res) => this.cargarHospitales());
  }

  // Cargar Hospitales con observable

  cargarHospitales () {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
                      .subscribe( (res: any) => {
                        console.log(res);
                        this.totalRegistros = res.total;
                        this.hospitales = res.hospitales;
                        this.cargando = false;
                      });
  }

  async crearHospital() {
   const nombreHospital = await Swal({
      title: 'Nombre de hospital',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'No has indicado un nombre!';
      }
    });
    if (nombreHospital.value !== undefined) {
      this._hospitalService.crearHospital(nombreHospital.value).subscribe((res) => {
        this.cargarHospitales();
      });
    }
  }

  mostrarModal ( id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  async actualizarHospital ( hospital: Hospital ) {
    const nombreHospital = await Swal({
      title: 'Actualizar el Hospital: ',
      input: 'text',
      inputValue: hospital.nombre,
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'No has indicado un nombre!';
      }
    });
    if (nombreHospital.value) {
       hospital.nombre = nombreHospital.value;
       this._hospitalService.actualizarHospital(hospital)
           .subscribe();
      }
  }

  borrarHospital( hospital: Hospital ) {
    Swal({
      title: '¿Estás Seguro?',
      text: 'Está a punto de borrar el Hospital:  ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
       if ( result.value) {
          this._hospitalService.borrarHospital(hospital._id)
              .subscribe((res) => {
                this.cargarHospitales();
                Swal(
                  'Borrado!',
                  'El Hospital "' + hospital.nombre + '" ha sido borrado',
                  'success'
                );
              });
       }
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
    this.cargarHospitales();
  }

  buscarHospital ( termino: string ) {
    if (termino === '') {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

}
