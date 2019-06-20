import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(public kundenService: KundenService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = true;
        this.kID = paramMap.get('id');
        this.kundenService.getKunde(this.kID).subscribe(kundeData => {
          console.log(kundeData);
          this.kunde = kundeData;
        });
      } else {
        this.mode = false;
        this.kID = null;
      }
    });
  }

  onSaveKunde(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let tempK = toKunde(form);
    if (!this.mode) {
      this.kundenService.addKunde(tempK);
    } else {
      tempK.id = this.kID;
      this.kundenService.updatePost(tempK);
    }

    form.resetForm();
  }
}
