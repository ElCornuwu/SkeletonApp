import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatosService } from 'src/app/datos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent  implements OnInit {

  nuevoUsuario: any = {
    nombre: '',
    mail: '',
    telefono: '',
    password: '',
    rol: '',
  };

  constructor(
    private alertController: AlertController,
    private datosService: DatosService,
    private router: Router
  ) { }

  ngOnInit() {}

  async registrar() {
    if (this.validarFormulario()) {
      this.nuevoUsuario.token = "1111"; // Agrega el token directamente
  
      this.datosService.registrarUsuario(this.nuevoUsuario).subscribe({
        next: () => {
          this.mostrarAlerta('Registro exitoso', 'El usuario ha sido creado correctamente.');
          this.router.navigate(['/login']); // Navegar a la página de login después de registrar
        },
        error: (err) => {
          console.error('Error al registrar el usuario:', err);
          this.mostrarAlerta('Error', 'Hubo un problema al crear el usuario.');
        },
      });
    }
  }

  validarFormulario(): boolean {
    const { nombre, mail, telefono, password, rol } = this.nuevoUsuario;

    if (!nombre.trim() || !mail.trim() || !telefono.trim() || !password.trim() || !rol.trim()) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios.');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(mail)) {
      this.mostrarAlerta('Error', 'El correo electrónico no es válido.');
      return false;
    }

    if (telefono.length < 9) {
      this.mostrarAlerta('Error', 'El número de teléfono debe tener al menos 9 dígitos.');
      return false;
    }

    if (password.length != 4) {
      this.mostrarAlerta('Error', 'La contraseña debe ser de 4 caracteres.');
      return false;
    }


    return true;
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Ok'],
    });
    await alert.present();
  }

}
