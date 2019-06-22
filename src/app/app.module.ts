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
  MatDividerModule
} from '@angular/material';
import { AppRoutingModule } from './approuting.module';

@NgModule({
  declarations: [AppComponent, KundeCreateComponent, HeaderComponent, KundeListComponent],
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
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
