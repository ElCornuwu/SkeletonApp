import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';



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

  login(usuario: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/user/?nombre=${usuario}`).pipe(
      retry(3)
    );
  }
  


  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }


  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
   
    return user.rol || null;
  }
  getUserNombre(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getUserId(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }


  registrarUsuario(usuario: any) {
    return this.http.post('http://localhost:3000/user', usuario);
  }
  
  getViajes(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiURL}/viaje`, { headers })
      .pipe(
        retry(3)  
      );
  }


  getDetallesViaje(viajeId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiURL}/viaje/${viajeId}`, { headers })
      .pipe(
        retry(3) 
      );
  }


  deleteViaje(id: number): Observable<any> {
    return this.http.delete(this.apiURL+'/viaje/' + id, {responseType: 'json'});
  }


  logout() {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    this.router.navigate(['/login']);  
    window.location.reload();          
  }



  
  addViaje(viaje: any): Observable<any> {
    if (viaje.id) {
    
      return this.http.put(this.apiURL + '/viaje/' + viaje.id, viaje, { responseType: 'json' });
    } else {
   
      return this.http.post(this.apiURL + '/viaje', viaje, { responseType: 'json' });
    }
  }

  updateViaje(viaje: any): Observable<any> {
    return this.http.put(`${this.apiURL}/viaje/${viaje.id}`, viaje, { responseType: 'json' });
  }

  addReserva(reserva: any): Observable<any> {
    return this.http.post(`${this.apiURL}/reservas`, reserva, { responseType: 'json' });
  }

  getReservas() {
    return this.http.get<any[]>(`${this.apiURL}/reservas`);
  }
  
  deleteReserva(id: string) {
    return this.http.delete(`${this.apiURL}/reservas/${id}`);
  }
}
