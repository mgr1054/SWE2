import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KundenService } from '../kunden.service';
import { toKunde } from '../../utils/tokunde';
import * as neuerKunde from './neuerKunde.json';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Kunde } from '../kunde.model';

@Component({
  selector: 'app-kunde-create',
  templateUrl: './kunde-create.component.html',
  styleUrls: ['./kunde-create.component.css']
})
export class KundeCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  public mode = false;
  private kID: string;
  public kunde: Kunde;
  laedt = false;
  form: FormGroup;

  constructor(public kundenService: KundenService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      geschlecht: new FormControl(null, { validators: [Validators.required] }),
      nachname: new FormControl(null, { validators: [Validators.required] }),
      interessen: new FormControl(null, { validators: [Validators.required] }),
      familienstand: new FormControl(null, { validators: [Validators.required] }),
      betrag: new FormControl(null, { validators: [Validators.required] }),
      waehrung: new FormControl(null, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required] }),
      kategorie: new FormControl(null, { validators: [Validators.required] }),
      geburtsdatum: new FormControl(null, { validators: [Validators.required] }),
      newsletter: new FormControl(null, { validators: [Validators.required] }),
      plz: new FormControl(null, { validators: [Validators.required] }),
      ort: new FormControl(null, { validators: [Validators.required] }),
      version: new FormControl({ value: null, disabled: !this.mode }, { validators: [Validators.required] }),
      username: new FormControl({ value: null, disabled: this.mode }, { validators: [Validators.required] }),
      password: new FormControl({ value: null, disabled: this.mode }, { validators: [Validators.required] }),
      homepage: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = true;
        this.kID = paramMap.get('id');
        this.laedt = true;
        this.kundenService.getKunde(this.kID).subscribe(kundeData => {
          this.laedt = false;
          this.kunde = kundeData;
          this.form.setValue({
            geschlecht: this.kunde.geschlecht,
            ort: this.kunde.adresse.ort,
            betrag: this.kunde.umsatz.betrag,
            waehrung: this.kunde.umsatz.waehrung,
            email: this.kunde.email,
            geburtsdatum: this.kunde.geburtsdatum,
            version: this.kunde.version,
            username: this.kunde.username,
            password: 'dummy',
            newsletter: this.kunde.newsletter,
            kategorie: this.kunde.kategorie,
            interessen: this.kunde.interessen,
            homepage: this.kunde.homepage,
            familienstand: this.kunde.familienstand,
            plz: this.kunde.adresse.plz,
            nachname: this.kunde.nachname
          });
        });
      } else {
        this.mode = false;
        this.kID = null;
      }
    });
  }

  onSaveKunde() {
    if (this.form.invalid) {
      return;
    }
    this.laedt = true;
    let tempK = toKunde(this.form);
    if (!this.mode) {
      this.kundenService.addKunde(tempK);
    } else {
      tempK.id = this.kID;
      tempK.username = this.kunde.username;
      tempK.user = this.kunde.user;
      this.kundenService.updatePost(tempK);
    }

    this.form.reset();
  }
}
