import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { KundeCreateComponent } from './kunde/kunde-create/kunde-create.component';
import { HeaderComponent } from './header/header.component';
import { KundeListComponent } from './kunde/kunde-list/kunde-list.component';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTabsModule,
  MatListModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatSnackBarModule
} from '@angular/material';
import { AppRoutingModule } from './approuting.module';
import { KundeLoginComponent } from './kunde/kunde-login/kunde-login.component';
import { KundeProfileComponent } from './kunde/kunde-profile/kunde-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    KundeCreateComponent,
    HeaderComponent,
    KundeListComponent,
    KundeLoginComponent,
    KundeProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
