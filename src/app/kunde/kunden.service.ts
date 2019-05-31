import { Kunde } from './kunde.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class KundenService {
  private kunden: Kunde[] = [];
  private kundenUpdated = new Subject<Kunde[]>();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:p')
  });

  constructor(private http: HttpClient) {}

  getKunden() {
    this.http
      .get<{ kunden: Kunde[] }>('https://localhost:8444/00000000-0000-0000-0000-000000000000', {
        headers: this.headers
      })
      .subscribe(kundenData => {
        this.kunden = kundenData.kunden;
        this.kundenUpdated.next([...this.kunden]);
      });
  }

  getKundenUpdateListener() {
    return this.kundenUpdated.asObservable();
  }

  /*
  addKunde(id: string, nachname: string) {
    const kunde: Kunde = { id: id, nachname: nachname };
    this.kunden.push(kunde);
    this.kundenUpdated.next([...this.kunden]);
  }*/
}
