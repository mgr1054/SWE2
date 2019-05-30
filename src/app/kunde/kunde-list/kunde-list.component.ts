import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kunde-list',
  templateUrl: './kunde-list.component.html',
  styleUrls: ['./kunde-list.component.css']
})
export class KundeListComponent {
  @Input() kunden = [];
}
