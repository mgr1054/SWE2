import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KundeListComponent } from './kunde/kunde-list/kunde-list.component';
import { KundeCreateComponent } from './kunde/kunde-create/kunde-create.component';
import { KundeLoginComponent } from './kunde/kunde-login/kunde-login.component';
import { KundeProfileComponent } from './kunde/kunde-profile/kunde-profile.component';

const routes: Routes = [
  { path: '', component: KundeListComponent },
  { path: 'create', component: KundeCreateComponent },
  { path: 'edit/:id', component: KundeCreateComponent },
  { path: 'login', component: KundeLoginComponent },
  { path: 'profile', component: KundeProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
