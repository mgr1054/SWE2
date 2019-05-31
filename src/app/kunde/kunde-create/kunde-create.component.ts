import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KundenService } from '../kunden.service';
import { from } from 'rxjs';

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
    // this.kundenService.addKunde(form.value.title, form.value.content);
    form.resetForm();
  }
}
