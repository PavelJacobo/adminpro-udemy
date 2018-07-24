import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild ('txtProgress') txtProgress: ElementRef;

  @Input('nombre') public leyenda: string = 'Leyenda';
  @Input() public progreso: number = 50;

  @Output('actualizarValor') cambioValor: EventEmitter<number> = new EventEmitter;

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChanges( newValue: number) {

    console.log( newValue );

    // let elemHTML  = (<HTMLInputElement>document.getElementsByName('progreso')[0]);
    // console.log( this.txtProgress );


    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if( newValue <= 0) {
      this.progreso = 0;
    } else{
      this.progreso = newValue;
    }


    // elemHTML.value =  this.progreso.toString();

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();
  }

  cambiarValor( valor: number ) {
    if ( this.progreso + valor > 100 ){
      return;
    }
    if ( this.progreso + valor < 0 ) {
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso );
  }
}
