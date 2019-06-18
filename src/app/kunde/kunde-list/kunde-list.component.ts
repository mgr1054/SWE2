import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Kunde } from '../kunde.model';
import { KundenService } from '../kunden.service';

@Component({
  selector: 'app-kunde-list',
  templateUrl: './kunde-list.component.html',
  styleUrls: ['./kunde-list.component.css']
})
export class KundeListComponent implements OnInit, OnDestroy {
  kunden: Kunde[] = [];
  private kundenSubsc: Subscription;

  constructor(public kundenService: KundenService) {}

  ngOnInit() {
    this.kundenService.getKunden();
    this.kundenSubsc = this.kundenService.getKundenUpdateListener().subscribe((kunden: Kunde[]) => {
      this.kunden = kunden;
    });
  }

  onDelete(kundenID: string) {
    this.kundenService.deleteKunde(kundenID);
  }

  //prevent mem leaks
  ngOnDestroy() {
    this.kundenSubsc.unsubscribe();
  }
}
