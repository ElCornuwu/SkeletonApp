import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login:any={
    usuario:"",
    password:""
  }

  constructor() { }

  ngOnInit() {
  }

  ingresar(){

    console.log("Estoy en el metodo ingresar")
    console.log(this.login.usuario);

    console.log(this.validar(this.login));

  }

  validar(model:any){
    
    if(model.usuario==""){
      return "usuario vacio";
    }else if(model.password==""){
      return "password vacío"
    }

    return "campos completos"

  }

}
