import { Component, OnInit } from '@angular/core';
import { KundenService } from '../kunde/kunden.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged;

  constructor(public kundenService: KundenService, private router: Router) {}
  ngOnInit(): void {
    this.kundenService.logged.subscribe(logging => (this.logged = logging));
  }

  onProfileClick() {
    this.kundenService.viewProfile();
  }
}
