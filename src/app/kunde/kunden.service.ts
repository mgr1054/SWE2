import { PostKunde, Kunde } from './kunde.model';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { toKundenf, toKundeme } from '../utils/tokunde';
import { compare } from '../utils/compareObj';
import { Router } from '@angular/router';
import { extractArr } from '../utils/extractArr';

@Injectable({ providedIn: 'root' })
export class KundenService {
  private kunden: any[] = [];
  private kundenUpdated = new Subject<any[]>();
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + btoa('admin:p')
  });
  private url = 'http://localhost:4200/rest';
  private loggedUpdated = new BehaviorSubject(false);
  logged = this.loggedUpdated.asObservable();

  private snack = new BehaviorSubject({ smthWrong: false, message: undefined });
  snack_val = this.snack.asObservable();

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
      .subscribe(
        kundenTrans => {
          this.kunden = kundenTrans;
          this.kundenUpdated.next([...this.kunden]);
        },
        error => {
          this.snack.next({ smthWrong: true, message: error.message });
          this.router.navigate(['/']);
        }
      );
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
        })
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
      .subscribe(
        responseData => {
          this.kunden.push(kundenDaten);
          this.kundenUpdated.next([...this.kunden]);
          this.router.navigate(['/']);
        },
        error => {
          this.snack.next({ smthWrong: true, message: error.message });
          this.router.navigate(['/']);
        }
      );
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
        .subscribe(
          resp => {
            const updatedKunden = [...this.kunden];
            const oldKundenInd = updatedKunden.findIndex(k => k.id === tid);
            updatedKunden[oldKundenInd] = daten;
            this.kunden = updatedKunden;
            this.kundenUpdated.next([...this.kunden]);
            this.router.navigate(['/']);
          },
          error => {
            this.snack.next({ smthWrong: true, message: error.message });
            this.router.navigate(['/']);
          }
        );
    } else {
      this.router.navigate(['/']);
    }
  }

  deleteKunde(kundenID: string) {
    this.http
      .delete(`${this.url}/` + kundenID, {
        headers: this.headers
      })
      .subscribe(
        () => {
          const upKunden = this.kunden.filter(kunde => kunde.id !== kundenID);
          this.kunden = upKunden;
          this.kundenUpdated.next([...this.kunden]);
        },
        error => {
          this.snack.next({ smthWrong: true, message: error.message });
          this.router.navigate(['/']);
        }
      );
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
      .subscribe(
        kunde => {
          res = kunde;
          this.kunden = [];
          this.kunden.push(res);
          this.kundenUpdated.next([...this.kunden]);
        },
        error => {
          this.snack.next({ smthWrong: true, message: error.message });
          this.router.navigate(['/']);
        }
      );
    return res;
  }

  findByParams(form) {
    let paramArr = extractArr(form);
    if (paramArr.length < 1) {
      this.kunden = [];
      this.kundenUpdated.next([...this.kunden]);
      this.router.navigate(['/']);
    }
    let uri = `${this.url}/?`;
    let res;
    let cut = 0;
    paramArr.forEach(element => {
      if (uri === `${this.url}/?`) {
        uri = uri.concat(element);
      } else {
        uri = uri.concat(`&${element}`);
      }
      cut += element.length;
    });
    cut += paramArr.length - 1;
    this.http
      .get<any>(uri, {
        headers: this.headers
      })
      .pipe(
        map(kundenData => {
          kundenData.map(kunde => {
            kunde.id = kunde.links[0].href.slice(24 + cut);
          });
          return kundenData;
        })
      )
      .subscribe(
        kunde => {
          res = kunde;
          this.kunden = res;
          this.kundenUpdated.next([...this.kunden]);
        },
        error => {
          this.snack.next({ smthWrong: true, message: error.message });
          this.router.navigate(['/']);
        }
      );
  }

  login(form) {
    let username = form.value.username;
    let password = form.value.password;

    const headersLog = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    this.http.get(`${this.url}/`, { headers: headersLog, observe: 'response' }).subscribe(
      responseData => {
        let respCode = responseData.status;
        if (respCode === 200) {
          this.loggedUpdated.next(true);
          this.router.navigate(['/']);
        } else {
          this.loggedUpdated.next(false);
          this.router.navigate(['/login']);
        }
      },
      error => {
        this.snack.next({ smthWrong: true, message: error.message });
        this.router.navigate(['/']);
      }
    );
  }
}
