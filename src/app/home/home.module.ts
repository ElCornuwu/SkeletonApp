import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { RutaComponent } from './ruta/ruta.component';
import { FormularioViajeComponent } from '../formulario-viaje/formulario-viaje.component';
import { AjustesComponent } from './ajustes/ajustes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, RutaComponent, FormularioViajeComponent, AjustesComponent]
})
export class HomePageModule {}
