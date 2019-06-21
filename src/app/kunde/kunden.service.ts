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
        observe: 'response'
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
    this.http
      .delete(`${this.url}/` + kundenID, {
        headers: this.headers
      })
      .subscribe(() => {
        const upKunden = this.kunden.filter(kunde => kunde.id !== kundenID);
        this.kunden = upKunden;
        this.kundenUpdated.next([...this.kunden]);
      });
  }

  findByID(id: String) {
    let res;
    this.http
      .get<any>(`${this.url}/${id}`, {
        headers: this.headers
      })
      .pipe(
        map(kundenData => {
          kundenData.id = kundenData.links[0].href.slice(22);
          return kundenData;
        })
      )
      .subscribe(kunde => {
        res = kunde;
        this.kunden = [];
        this.kunden.push(res);
        this.kundenUpdated.next([...this.kunden]);
      });
    return res;
  }

  findByEmail(email: String) {
    let res;
    let cut = email.length;
    this.http
      .get<any>(`${this.url}/?email=${email}`, {
        headers: this.headers
      })
      .pipe(
        map(kundenData => {
          kundenData.map(kunde => {
            kunde.id = kunde.links[0].href.slice(30 + cut);
          });
          return kundenData;
        })
      )
      .subscribe(kunde => {
        res = kunde;
        this.kunden = [];
        this.kunden = res;
        this.kundenUpdated.next([...this.kunden]);
      });
    return res;
  }

  findByNachnOrt(nachn: String, ort: String) {
    let res;
    let cut = nachn.length + ort.length;
    this.http
      .get<any>(`${this.url}/?nachname=${nachn}&ort=${ort}`, {
        headers: this.headers
      })
      .pipe(
        map(kundenData => {
          kundenData.map(kunde => {
            kunde.id = kunde.links[0].href.slice(38 + cut);
          });
          return kundenData;
        })
      )
      .subscribe(kunde => {
        res = kunde;
        this.kunden = [];
        this.kunden = res;
        this.kundenUpdated.next([...this.kunden]);
      });
    return res;
  }

  findByNachnOrtPlz(nachn: String, ort: String, plz: String) {
    let res;
    let cut = nachn.length + ort.length + plz.length;
    this.http
      .get<any>(`${this.url}/?nachname=${nachn}&ort=${ort}&plz=${plz}`, {
        headers: this.headers
      })
      .pipe(
        map(kundenData => {
          kundenData.map(kunde => {
            kunde.id = kunde.links[0].href.slice(44 + cut);
          });
          return kundenData;
        })
      )
      .subscribe(kunde => {
        res = kunde;
        this.kunden = [];
        this.kunden = res;
        this.kundenUpdated.next([...this.kunden]);
      });
    return res;
  }

  findByNachname(nachname: String) {
    let res;
    let cut = nachname.length;
    this.http
      .get<any>(`${this.url}/?nachname=${nachname}`, {
        headers: this.headers
      })
      .pipe(
        map(kundenData => {
          kundenData.map(kunde => {
            kunde.id = kunde.links[0].href.slice(33 + cut);
          });
          return kundenData;
        })
      )
      .subscribe(kunde => {
        res = kunde;
        this.kunden = [];
        this.kunden = res;
        this.kundenUpdated.next([...this.kunden]);
      });
    return res;
  }
}
