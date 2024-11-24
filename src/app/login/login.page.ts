import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AnimationController, Animation } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { DatosService } from '../datos.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('logoWrapper', { read: ElementRef }) logoWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('logoImage', { read: ElementRef }) logoImage!: ElementRef<HTMLImageElement>;

  private movementAnimation!: Animation;
  private rotationAnimation!: Animation;

  alertButtons = ['Action'];

  rol:any=""

  login:any={
    usuario:"",
    password:""
  }

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private router: Router,
    private datosService: DatosService
  ) { }

  ngAfterViewInit() {
    
    this.movementAnimation = this.animationCtrl
      .create()
      .addElement(this.logoWrapper.nativeElement)
      .duration(500)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0)' },  
        { offset: 1, transform: 'translateX(300px)' } 
      ]);

    
    this.rotationAnimation = this.animationCtrl
      .create()
      .addElement(this.logoImage.nativeElement)
      .duration(500)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },  
        { offset: 1, transform: 'rotate(360deg)' } 
      ])
      .onFinish(() => {
        this.alertaInicio('Éxito', this.login.usuario + ' ha iniciado sesión correctamente');
      });
  }

  play() {
    this.movementAnimation.play();
    this.rotationAnimation.play();
  }

  ngOnInit() {
  }

  ingresar() {
    if (this.login.usuario.trim() === "") {
      this.alertaErrorUser();
      return;
    }
  
    if (this.login.password.trim() === "") {
      this.alertaErrorPass();
      return;
    }
  
    this.datosService.login(this.login.usuario, this.login.password).subscribe({
      next: (response) => {
        if (response.length > 0 && response[0].password === this.login.password) {
          const user = response[0];
  
          if (user.token) {

            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
  
            this.alertaInicio('Éxito', `${this.login.usuario} ha iniciado sesión correctamente`);
  

            const rol = user.rol;
            if (rol === 'Conductor') {
              this.router.navigate(['/home/administrar-viaje']);
            } else if (rol === 'Pasajero') {
              this.router.navigate(['/home/ruta']);
            } else {
              console.error('Rol no reconocido');
            }
          } else {
            this.alertaErrorLogin();
            console.error('Error de autenticación: No se recibió un token');
          }
        } else {
          this.alertaErrorLogin();
          console.error('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => {
        this.alertaErrorLogin();
        console.error('Error en el inicio de sesión:', err);
      },
    });
  }
  

  validarRol() {
    const role = this.datosService.getUserRole();
    if (role) {
      if (role === "Pasajero") {
        this.router.navigate(['/home/ruta']);
      } else if (role === "Conductor") {
        this.router.navigate(['/home/usuario']);
      } else {
        console.error("Rol no reconocido");
      }
    } else {
      console.error("No se pudo obtener el rol del usuario");
    }
  }

  valNumPass(event: any){
    const input = event.target.value as string;
    const filteredInput = input.replace(/[^0-9]/g, '');
    this.login.password = filteredInput;
    event.target.value = filteredInput;
  }

  async alertaInicio(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async alertaErrorUser() {
    const alert = await this.alertController.create({
      header: 'ERROR!',
      subHeader: 'Error al iniciar sesión',
      message: 'Se debe ingresar un usuario',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async alertaErrorPass() {
    const alert = await this.alertController.create({
      header: 'ERROR!',
      subHeader: 'Error al iniciar sesión',
      message: 'Se debe ingresar la contraseña',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async alertaErrorLogin() {
    const alert = await this.alertController.create({
      header: 'ERROR!',
      subHeader: 'Error al iniciar sesión',
      message: 'Usuario o contraseña incorrectos',
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
