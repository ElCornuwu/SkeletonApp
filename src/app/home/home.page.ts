import { Component, ViewEncapsulation } from '@angular/core';
import { AlertController, AlertInput } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {

  public nombre: string = '';
  public apellido: string = '';
  public educacion: string = '';
  public fechaNacimiento: string = '';
  
  public alertButtons = ['OK'];
  public alertInputs: AlertInput[] = [
    {
      label: 'Básica',
      type: 'radio',
      value: 'Básica',
    },
    {
      label: 'Media',
      type: 'radio',
      value: 'Media',
    },
    {
      label: 'Superior',
      type: 'radio',
      value: 'Superior',
    },
  ];


  constructor(private alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Selecciona tu nivel de educación',
      inputs: this.alertInputs,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data: string) => {
            this.educacion = data;
          },
        },
      ],
    });
  
    await alert.present();
  }

  async mostrarDatos() {
    const alert = await this.alertController.create({
      header: 'Datos ingresados',
      message: `
        Nombre: ${this.nombre} -
        Apellido: ${this.apellido} -
        Nivel de Educación: ${this.educacion} -
        Fecha de Nacimiento: ${this.fechaNacimiento}
      `,
      buttons: ['OK'],
    });

    await alert.present();
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.educacion = '';
    this.fechaNacimiento = '';
  }
  
}

