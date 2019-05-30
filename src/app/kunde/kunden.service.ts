import { Kunde } from './kunde.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class KundenService {
  private kunden: Kunde[] = [];
  private kundenUpdated = new Subject<Kunde[]>();

  constructor(private httpClient: HttpClient) {}

  getKunden() {
    return [...this.kunden];
  }

  getKundenUpdateListener() {
    return this.kundenUpdated.asObservable();
  }

  addKunde(title: string, content: string) {
    const kunde: Kunde = { title: title, content: content };
    this.kunden.push(kunde);
    this.kundenUpdated.next([...this.kunden]);
  }

  findById(id: string) {
    const uri = `https://localhost:8443/${id}`;
    this.httpClient.get(uri).subscribe();
  }
}
