import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Kunde } from '../kunde.model';
import { KundenService } from '../kunden.service';
import { PageEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kunde-list',
  templateUrl: './kunde-list.component.html',
  styleUrls: ['./kunde-list.component.css']
})
export class KundeListComponent implements OnInit, OnDestroy {
  kunden: Kunde[] = [];
  private kundenSubsc: Subscription;
  laedt = false;
  public totalKunden = 10;
  kundenProPage = 2;
  pageGroesse = [1, 2, 3, 7, 10];
  formByID: FormGroup;
  formByNachnOrtPlz: FormGroup;
  formByNachnOrt: FormGroup;
  formByEmail: FormGroup;
  formByNachname: FormGroup;

  constructor(public kundenService: KundenService) {}

  ngOnInit() {
    this.formByID = new FormGroup({
      id: new FormControl(null, { validators: [Validators.required] })
    });
    this.formByNachname = new FormGroup({
      nachn: new FormControl(null, { validators: [Validators.required] })
    });
    this.formByEmail = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] })
    });
    this.formByNachnOrt = new FormGroup({
      nachn: new FormControl(null, { validators: [Validators.required] }),
      ort: new FormControl(null, { validators: [Validators.required] })
    });
    this.formByNachnOrtPlz = new FormGroup({
      nachn: new FormControl(null, { validators: [Validators.required] }),
      ort: new FormControl(null, { validators: [Validators.required] }),
      plz: new FormControl(null, { validators: [Validators.required] })
    });
    this.kundenSubsc = this.kundenService.getKundenUpdateListener().subscribe((kunden: Kunde[]) => {
      this.laedt = false;
      this.kunden = kunden;
    });
  }

  onDelete(kundenID: string) {
    this.kundenService.deleteKunde(kundenID);
  }

  onChangedPage(pageData: PageEvent) {}
  onFindKundeByID() {
    this.kundenService.findByID(this.formByID.value.id);
  }
  onFindKundeByEmail() {
    this.kundenService.findByEmail(this.formByEmail.value.email);
  }
  onFindKundeByNachname() {
    this.kundenService.findByNachname(this.formByNachname.value.nachn);
  }
  onFindKundeByNachnOrt() {
    this.kundenService.findByNachnOrt(this.formByNachnOrt.value.nachn, this.formByNachnOrt.value.ort);
  }
  onFindKundeByNachnOrtPlz() {
    this.kundenService.findByNachnOrtPlz(
      this.formByNachnOrtPlz.value.nachn,
      this.formByNachnOrtPlz.value.ort,
      this.formByNachnOrtPlz.value.plz
    );
  }

  //prevent mem leaks
  ngOnDestroy() {
    this.kundenSubsc.unsubscribe();
  }
}
