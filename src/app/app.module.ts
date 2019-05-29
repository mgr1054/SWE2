import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { KundeCreateComponent } from './kunde/kunde-create/kunde-create.component'
import { HeaderComponent } from './header/header.component'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
} from '@angular/material'

@NgModule({
    declarations: [AppComponent, KundeCreateComponent, HeaderComponent],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
