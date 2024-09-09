import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AnimationController, Animation } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

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

  login:any={
    usuario:"",
    password:""
  }

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private router: Router
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
    console.log("Estoy en el metodo ingresar");
    console.log(this.login.usuario);
  
    this.validar(this.login).then((resultado) => {
      if (resultado === "campos completos") {
        console.log("Validación exitosa, iniciando animación...");
        this.play(); 
        setTimeout(() => {
          let navigationExtras: NavigationExtras = {
            state: { user: this.login.usuario }
          };
          console.log("Navegando con datos: ", navigationExtras);
          this.router.navigate(['/home'], navigationExtras);
        }, 1000);
      }
    });
  }

  valNumPass(event: any){
    const input = event.target.value as string;
    const filteredInput = input.replace(/[^0-9]/g, '');
    this.login.password = filteredInput;
    event.target.value = filteredInput;
  }

  async validar(model: any) {
    if (model.usuario === "") {
      await this.alertaErrorUser();
      return "usuario vacio";
    } else if (model.usuario.length < 3) {
      await this.alertaErrorUser();
      return "usuario debe ser mayor a 3 caracteres";
    } else if (model.password == "") {
      await this.alertaErrorPass();
      return "password vacío";
    } else if (model.password.length != 4) {
      await this.alertaErrorPass();
      return "contraseña debe ser de 4 caracteres";
    }
    
    
    return "campos completos"; 
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
      message: 'El usuario debe contener un minimo de 3 caracteres',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async alertaErrorPass() {
    const alert = await this.alertController.create({
      header: 'ERROR!',
      subHeader: 'Error al iniciar sesión',
      message: 'La contraseña debe tener 4 caracteres',
      buttons: ['Ok'],
    });

    await alert.present();
  }

}
