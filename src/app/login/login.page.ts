import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  alertButtons = ['Action'];

  login:any={
    usuario:"",
    password:""
  }

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ingresar(){

    console.log("Estoy en el metodo ingresar")
    console.log(this.login.usuario);

    console.log(this.validar(this.login));

  }

  valNumPass(event: any){
    const input = event.target.value as string;
    const filteredInput = input.replace(/[^0-9]/g, '');
    this.login.password = filteredInput;
    event.target.value = filteredInput;
  }

  async validar(model:any){

    if(model.usuario===""){
      await this.alertaErrorUser();
      return "usuario vacio";
    }else if(model.usuario.length <3){
      await this.alertaErrorUser();
      return "usuario debe ser mayor a 3 caracteres"
    }else if(model.password==""){
      await this.alertaErrorPass();
      return "password vacío"
    }else if(model.password.length!=4){
      await this.alertaErrorPass();
      return "contraseña debe ser de 4 caracteres"
    }

    
    this.navCtrl.navigateRoot('/home');
    await this.alertaInicio('Éxito', this.login.usuario+' ha iniciado sesión correctamente');
    return "campos completos"

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
