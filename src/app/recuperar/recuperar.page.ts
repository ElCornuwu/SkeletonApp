import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AnimationController, Animation } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  @ViewChild('logoWrapper', { read: ElementRef }) logoWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('logoImage', { read: ElementRef }) logoImage!: ElementRef<HTMLImageElement>;
  
  private movementAnimation!: Animation;
  private rotationAnimation!: Animation;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private router: Router
  ) { }

  recuperar:any={
    usuario:"",
  }

  ngOnInit() {}

  ingresar() {
    this.validar(this.recuperar.usuario).then((resultado) => {
      if (resultado === "campos completos") {
        console.log("Validación exitosa, iniciando animación...");
        this.play(); 
        
        setTimeout(() => {
          let navigationExtras: NavigationExtras = {
            state: { user: this.recuperar.usuario }
          };
          console.log("Navegando con datos: ", navigationExtras);
          this.router.navigate(['/login'], navigationExtras);
        }, 1000);
      } else {
        console.log("Validación fallida:", resultado);
      }
    });
  }

  async validar(usuario: string) {
    if (!usuario) {
      await this.alertaErrorUser('El campo de usuario no puede estar vacío');
      return "usuario vacío";
    } else if (usuario.length < 3) {
      await this.alertaErrorUser('El usuario debe contener un mínimo de 3 caracteres');
      return "usuario demasiado corto";
    }
    
    return "campos completos"; 
  }

  async alertaErrorUser(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'ERROR!',
      subHeader: 'Error al iniciar sesión',
      message: mensaje,
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async alertaInicio() {
    const alert = await this.alertController.create({
      header: 'Recuperación',
      message: `Se ha mandado un correo al usuario: ${this.recuperar.usuario} para recuperar la contraseña`,
      buttons: ['Ok'],
    });
    await alert.present();
  }

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
        this.alertaInicio();
      });
  }

  play() {
    this.movementAnimation.play();
    this.rotationAnimation.play();
  }

}
