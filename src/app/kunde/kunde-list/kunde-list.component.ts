import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Kunde } from '../kunde.model';
import { KundenService } from '../kunden.service';
import { PageEvent, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-kunde-list',
  templateUrl: './kunde-list.component.html',
  styleUrls: ['./kunde-list.component.css']
})
export class KundeListComponent implements OnInit, OnDestroy {
  kunden: Kunde[] = [];
  private kundenSubsc: Subscription;
  laedt = false;
  formByID: FormGroup;
  formByParams: FormGroup;
  snacken;

  constructor(public kundenService: KundenService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.formByID = new FormGroup({
      id: new FormControl(null)
    });
    this.formByParams = new FormGroup({
      email: new FormControl(null),
      kategorie: new FormControl(null),
      geschlecht: new FormControl(null),
      familienstand: new FormControl(null),
      plz: new FormControl(null),
      ort: new FormControl(null),
      nachname: new FormControl(null)
    });
    this.kundenSubsc = this.kundenService.getKundenUpdateListener().subscribe((kunden: Kunde[]) => {
      this.laedt = false;
      this.kunden = kunden;
    });
    this.kundenService.snack_val.subscribe(val => (this.snacken = val));
    if (this.snacken.smthWrong) {
      this.openSnackBar(this.snacken.message);
    }
  }

  onDelete(kundenID: string) {
    this.kundenService.deleteKunde(kundenID);
  }

  onChangedPage(pageData: PageEvent) {}

  onFindKundeByID() {
    this.kundenService.findByID(this.formByID.value.id);
  }

  onFindKundeByParams() {
    this.kundenService.findByParams(this.formByParams);
    this.formByParams.reset();
  }

  openSnackBar(message) {
    this._snackBar.open(message, 'OK', {
      duration: 7000
    });
  }

  // prevent mem leaks
  ngOnDestroy() {
    this.kundenSubsc.unsubscribe();
  }
}
