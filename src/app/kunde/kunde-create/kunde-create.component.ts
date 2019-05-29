import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
@Component({
    selector: 'app-kunde-create',
    templateUrl: './kunde-create.component.html',
    styleUrls: ['./kunde-create.component.css'],
})
export class KundeCreateComponent {
    newKunde = ''
    enteredValue = ''

    onAddKunde() {
        this.newKunde = this.enteredValue
    }
}
