import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KundenService } from '../kunden.service';
import { toKunde } from '../../utils/tokunde';
import * as neuerKunde from './neuerKunde.json';

@Component({
  selector: 'app-kunde-create',
  templateUrl: './kunde-create.component.html',
  styleUrls: ['./kunde-create.component.css']
})
export class KundeCreateComponent {
  enteredContent = '';
  enteredTitle = '';

  constructor(public kundenService: KundenService) {}

  onAddKunde(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let tempK = toKunde(form);
    this.kundenService.addKunde(tempK);
    form.resetForm();
  }
}
