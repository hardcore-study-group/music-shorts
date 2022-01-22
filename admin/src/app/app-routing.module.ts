import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {SignInComponent} from './view/sign-in/sign-in.component';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToSignin = () => redirectUnauthorizedTo(['sign-in']);
const redirectSignedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    ...canActivate(redirectSignedInToDashboard),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    ...canActivate(redirectUnauthorizedToSignin),
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
