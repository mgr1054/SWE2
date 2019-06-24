import { Component, OnInit } from '@angular/core';

import { KundenService } from '../kunden.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kunde-login',
  templateUrl: './kunde-profile.component.html',
  styleUrls: ['./kunde-profile.component.css']
})
export class KundeProfileComponent implements OnInit {
  kunde;

  constructor(public kundenService: KundenService, private router: Router) {}

  ngOnInit() {
    this.kundenService.kundeVal.subscribe(kunde => (this.kunde = kunde));
  }

  nachHause() {
    this.router.navigate(['/']);
  }
}
