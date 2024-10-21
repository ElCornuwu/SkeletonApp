import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';  // Para reintentar solicitudes fallidas
import { Router } from '@angular/router';
//import { DatosService } from './datos.service';//xxxxx


@Injectable({
  providedIn: 'root'
})
export class DatosService {
  getUser() {
    throw new Error('Method not implemented.');
  }
  getUserRol() {
    throw new Error('Method not implemented.');
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  apiURL = 'http://localhost:3000';  

  constructor(private http: HttpClient, private router: Router) {}

  // Método de login
  login(usuario: string, password: string) {
    return this.http.get<any>(`${this.apiURL}/user/?nombre=${usuario}`)
      .subscribe(response => {
      if( response.length < 0){
        return;
      }

        if(response[0].password === password ){

      
        // Si la respuesta tiene un token
        if (response[0].token) {
          localStorage.setItem('token', response[0].token);  // Guarda el token
          localStorage.setItem('user', JSON.stringify(response[0]));  // Guarda la información del usuario
        //this.router.navigateByUrl('/home/usuario',);  // Redirige al usuario
        const rol = response[0].rol;
        if (rol === 'Conductor') {
          this.router.navigateByUrl('/home/administrar-viaje');  // Redirige al Conductor
        } else if (rol === 'Pasajero') {
          this.router.navigateByUrl('/home/ruta');  // Redirige al Pasajero
        } else {
          console.error('Rol no reconocido');
        }
      } else {
        console.error('Error de autenticación: No se recibió un token');
      }
    } else {
      console.error('Usuario o contraseña incorrecta');
    }
  }, error => {
    console.error('Error en el inicio de sesión:', error);
  });
}

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;  // Devuelve true si hay un token, de lo contrario false
  }

  // Obtiene el rol del usuario autenticado
  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
   
    return user.rol || null;  // Devuelve el rol del usuario
  }
  getUserNombre(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Parsea el string JSON a un objeto
  }
  

  // Obtener viajes, con autenticación
  getViajes(): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Incluir el token en los headers
    });

    return this.http.get<any>(`${this.apiURL}/viaje`, { headers })
      .pipe(
        retry(3)  // Intentar 3 veces en caso de error
      );
  }

  // Otro ejemplo de solicitud autenticada
  getDetallesViaje(viajeId: number): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // Incluir el token en los headers
    });

    return this.http.get<any>(`${this.apiURL}/viaje/${viajeId}`, { headers })
      .pipe(
        retry(3)  // Intentar 3 veces en caso de error
      );
  }


  deleteViaje(id: number): Observable<any> {
    return this.http.delete(this.apiURL+'/viaje/' + id, {responseType: 'json'});
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');  // Elimina el token
    localStorage.removeItem('user');  // Elimina la información del usuario
    this.router.navigate(['/login']);  // Redirige al usuario a la página de login
  }



  
  addViaje(viaje: any): Observable<any> {
    if (viaje.id) {
      // Si el viaje tiene un ID, actualizar el viaje (PUT)
      return this.http.put(this.apiURL + '/viaje/' + viaje.id, viaje, { responseType: 'json' });
    } else {
      // Si no tiene ID, agregar un nuevo viaje (POST)
      return this.http.post(this.apiURL + '/viaje', viaje, { responseType: 'json' });
    }
  }
}
