import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KundeListComponent } from './kunde/kunde-list/kunde-list.component';
import { KundeCreateComponent } from './kunde/kunde-create/kunde-create.component';

const routes: Routes = [
  { path: '', component: KundeListComponent },
  { path: 'create', component: KundeCreateComponent },
  { path: 'edit/:id', component: KundeCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
