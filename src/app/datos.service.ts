import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private dbUrl = 'assets/files/db.json';

  constructor(private http:HttpClient) { }

  getViajes(): Observable<any> {
    return this.http.get(this.dbUrl);
  }

  apiURL = 'https://jsonplaceholder.typicode.com';
}

