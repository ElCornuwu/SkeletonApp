import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';  // Para reintentar solicitudes fallidas
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiURL = 'http://localhost:3000';  // Cambia esta URL si tienes otra ruta de API

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
         this.router.navigateByUrl('/home/ruta');  // Redirige al usuario
        
        } else {
          console.error('Error de autenticación: No se recibió un token');
        }
      }else(
        console.error('usuario o contraseña incorrecta')
      )
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

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');  // Elimina el token
    localStorage.removeItem('user');  // Elimina la información del usuario
    this.router.navigate(['/login']);  // Redirige al usuario a la página de login
  }
}
