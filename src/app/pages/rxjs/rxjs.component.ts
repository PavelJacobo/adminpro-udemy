import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      numero => console.log('Subs', numero),
      error => console.log('Error en Consola ', error),
      () => console.log('El Observador terminó')
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        const salida = {
          valor: contador
        };
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }
}
