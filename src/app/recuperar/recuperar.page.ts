import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

 recuperar:any={
    usuario:"",
  }
  

  ngOnInit() {
  }

  async validar(model:any){
    if(model.usuario === ""){
      return await this.alertaErrorUser();
    }else if(model.usuario.length < 3){
      return await this.alertaErrorUser();
    }

    this.navCtrl.navigateRoot('/home');
    return await this.alertaInicio();

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

  async alertaInicio() {
    const alert = await this.alertController.create({
      header: 'Recuperación',
      message: `Se ha mandado un correo al usuario: ${this.recuperar.usuario} para recuperar la contraseña`,
      buttons: ['Ok'],
    });

    await alert.present();
  }

}
