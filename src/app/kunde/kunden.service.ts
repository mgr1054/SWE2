import { PostKunde } from './kunde.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as KundenDaten from './kunde-create/neuerKunde.json';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class KundenService {
  private kunden: any[] = [];
  private kundenUpdated = new Subject<any[]>();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:p')
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

  deleteKunde(kundenID: string) {
    this.http.delete(`${this.url}/` + kundenID).subscribe(() => {
      const upKunden = this.kunden.filter(kunde => kunde.id !== kundenID);
      this.kunden = upKunden;
      this.kundenUpdated.next([...this.kunden]);
    });
  }
}
