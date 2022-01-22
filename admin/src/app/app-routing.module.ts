import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardViewComponent} from './views/dashboard-view/dashboard-view.component';
import {SignInViewComponent} from './views/sign-in-view/sign-in-view.component';

const routes: Routes = [
  {path: 'sign-in', component: SignInViewComponent},
  {path: 'dashboard', component: DashboardViewComponent},
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
