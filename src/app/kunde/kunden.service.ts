import { Kunde } from './kunde.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as KundenDaten from './kunde-create/neuerKunde.json';

@Injectable({ providedIn: 'root' })
export class KundenService {
  private kunden: Kunde[];
  private kundenUpdated = new Subject<Kunde[]>();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:p')
  });
  private url = 'http://localhost:4200/rest';

  constructor(private http: HttpClient) {}

  getKunden() {
    this.http
      .get<Kunde[]>(`${this.url}/`, {
        headers: this.headers
      })
      .subscribe(kundenData => {
        this.kunden = kundenData;
        this.kunden.forEach(element => {
          let pid = element.links[0].href;
          pid = pid.slice(22);
          element.id = pid;
        });
        this.kundenUpdated.next([...this.kunden]);
      });
  }

  getKundenUpdateListener() {
    return this.kundenUpdated.asObservable();
  }

  /*
    addKunde(id: string, nachname: string) {
      const kunde: any = KundenDaten;
      this.http.post(`${this.url}/`, kunde)
        .subscribe((responseData) => {
          console.log(responseData);
        });
      this.kunden.push(kunde);
      this.kundenUpdated.next([...this.kunden]);
    }*/
}
