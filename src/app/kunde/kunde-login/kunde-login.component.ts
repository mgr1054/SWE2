import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Kunde } from '../kunde.model';
import { KundenService } from '../kunden.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kunde-login',
  templateUrl: './kunde-login.component.html',
  styleUrls: ['./kunde-login.component.css']
})
export class KundeLoginComponent implements OnInit {
  formLogin: FormGroup;
  loggedstat;
  public username;

  constructor(public kundenService: KundenService) {}

  ngOnInit() {
    this.formLogin = new FormGroup({
      username: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] })
    });
    this.kundenService.logged.subscribe(logging => (this.loggedstat = logging));
  }

  onLogin() {
    this.kundenService.login(this.formLogin);
    this.kundenService.username = this.formLogin.value.username;
  }

  onLogout() {
    this.kundenService.logout();
  }

  onViewProfile() {
    this.kundenService.viewProfile();
  }
}
