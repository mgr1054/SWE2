import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-kunde-create',
  templateUrl: './kunde-create.component.html',
  styleUrls: ['./kunde-create.component.css']
})
export class KundeCreateComponent {
  enteredContent = '';
  enteredTitle = '';
  @Output() kundeCreated = new EventEmitter();

  onAddKunde() {
    const kunde = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.kundeCreated.emit(kunde);
  }
}
