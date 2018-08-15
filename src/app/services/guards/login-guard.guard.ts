import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router ) {

  }
  canActivate() {
    if ( this._usuarioService.islogged()) {
      console.log('Pasó el GUARD');
      return true;
    } else {
      console.log('Bloqueado por GUARD');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
