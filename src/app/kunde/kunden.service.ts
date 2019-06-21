import { PostKunde, Kunde } from './kunde.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { toKundenf, toKundeme } from '../utils/tokunde';
import { compare } from '../utils/compareObj';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KundenService {
  private kunden: any[] = [];
  private kundenUpdated = new Subject<any[]>();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:p')
  });
  private url = 'http://localhost:4200/rest';

  constructor(private http: HttpClient, private router: Router) {}

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
    return this.http
      .get(`${this.url}/${id}`, {
        headers: this.headers,
        observe: 'response'
      })
      .pipe(
        map(kunde => {
          let kundeTrans: any = kunde.body;
          kundeTrans.version = kunde.headers.get('etag').slice(1, 2);
          toKundeme(kundeTrans);
          return kundeTrans;
        }),
        catchError(() => this.router.navigate(['/']))
      );
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
      .pipe(catchError(() => this.router.navigate(['/'])))
      .subscribe(responseData => {
        this.kunden.push(kundenDaten);
        this.kundenUpdated.next([...this.kunden]);
        this.router.navigate(['/']);
      });
  }

  updatePost(daten: Kunde) {
    const tid = daten.id;
    let vgl = this.kunden.find(k => k.id === tid);
    vgl = toKundenf(vgl);
    daten = toKundenf(daten);
    console.log(daten);
    let putheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa('admin:p'),
      'If-Match': daten.version
    });
    if (!compare(daten, vgl)) {
      toKundenf(daten);
      this.http
        .put(`${this.url}/` + tid, daten, {
          headers: putheaders
        })
        .pipe(catchError(() => this.router.navigate(['/'])))
        .subscribe(resp => {
          const updatedKunden = [...this.kunden];
          const oldKundenInd = updatedKunden.findIndex(k => k.id === tid);
          updatedKunden[oldKundenInd] = daten;
          this.kunden = updatedKunden;
          this.kundenUpdated.next([...this.kunden]);
          this.router.navigate(['/']);
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  deleteKunde(kundenID: string) {
    this.http.delete(`${this.url}/` + kundenID).subscribe(() => {
      const upKunden = this.kunden.filter(kunde => kunde.id !== kundenID);
      this.kunden = upKunden;
      this.kundenUpdated.next([...this.kunden]);
    });
  }
}
