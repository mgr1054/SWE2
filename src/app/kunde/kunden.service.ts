import { PostKunde, Kunde } from './kunde.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { toKunde, toKundenf } from '../utils/tokunde';

@Injectable({ providedIn: 'root' })
export class KundenService {
  private kunden: any[] = [];
  private kundenUpdated = new Subject<any[]>();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:p')
  });
  private putheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:p'),
    'If-Match': '1'
  });
  private url = 'http://localhost:4200/rest';

  constructor(private http: HttpClient) {}

  getKunden() {
    this.http
      .get<any[]>(`${this.url}/`, {
        headers: this.headers
      })
      .pipe(
        map(kundenData => {
          kundenData.map(kunde => {
            kunde.id = kunde.links[0].href.slice(22);
          });
          return kundenData;
        })
      )
      .subscribe(kundenTrans => {
        this.kunden = kundenTrans;
        this.kundenUpdated.next([...this.kunden]);
      });
  }

  getKunde(id: string) {
    return this.http.get<Kunde>(`${this.url}/${id}`, {
      headers: this.headers
    });
  }

  getKundenUpdateListener() {
    return this.kundenUpdated.asObservable();
  }

  addKunde(kundenDaten: PostKunde) {
    this.http
      .post(`${this.url}`, kundenDaten, {
        headers: this.headers,
        observe: 'response',
        responseType: 'text'
      })
      .subscribe(responseData => {
        this.kunden.push(kundenDaten);
        this.kundenUpdated.next([...this.kunden]);
      });
  }

  updatePost(daten: Kunde) {
    console.log(daten);
    const tid = daten.id;
    toKundenf(daten);
    console.log(daten);
    this.http
      .put(`${this.url}/` + tid, daten, {
        headers: this.putheaders
      })
      .subscribe(resp => {
        const updatedKunden = [...this.kunden];
        const oldKundenInd = updatedKunden.findIndex(k => k.id === tid);
        updatedKunden[oldKundenInd] = daten;
        this.kunden = updatedKunden;
        this.kundenUpdated.next([...this.kunden]);
      });
  }

  deleteKunde(kundenID: string) {
    this.http.delete(`${this.url}/` + kundenID).subscribe(() => {
      const upKunden = this.kunden.filter(kunde => kunde.id !== kundenID);
      this.kunden = upKunden;
      this.kundenUpdated.next([...this.kunden]);
    });
  }
}
