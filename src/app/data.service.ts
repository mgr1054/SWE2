import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    // https://reqres.in/api/users für Testzwecke
    // https://localhost:8444/ in der Abgabe, braucht noch basic auth
    return this.http.get('https://reqres.in/api/users');
  }
}
