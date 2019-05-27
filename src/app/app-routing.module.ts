import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'charts', component: ChartsComponent},
  { path: 'search', component: SearchComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
