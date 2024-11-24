import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent  implements OnInit {

  usuario: any = {};

  constructor() { }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      this.usuario = JSON.parse(usuario); // Parsear los datos del usuario desde localStorage
    } else {
      console.error('No se encontraron datos del usuario en localStorage');
    }
  }

}
