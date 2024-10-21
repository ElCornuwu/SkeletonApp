import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { RutaComponent } from './ruta/ruta.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { FormularioViajeComponent } from '../formulario-viaje/formulario-viaje.component';
import { AdministrarViajeComponent } from './administrar-viaje/administrar-viaje.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ReservaComponent } from './reserva/reserva.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, RutaComponent,UsuarioComponent, FormularioViajeComponent,AdministrarViajeComponent, AjustesComponent, ReservaComponent]

})
export class HomePageModule {}
