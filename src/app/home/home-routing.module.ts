import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { RutaComponent } from './ruta/ruta.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdministrarViajeComponent } from './administrar-viaje/administrar-viaje.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ReservaComponent } from './reserva/reserva.component';
import { AdministrarReservaComponent } from './administrar-reserva/administrar-reserva.component';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path:'ruta',
        component: RutaComponent
      },
     
      {
        path:'usuario',
        component: UsuarioComponent
      },
      {
        path:'administrar-viaje',
        component: AdministrarViajeComponent
      },
      {
        path:'ajustes',
        component: AjustesComponent
      },
      {
        path:'reserva',
        component: ReservaComponent
      },
      {
        path:'administrar-reserva',
        component: AdministrarReservaComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}