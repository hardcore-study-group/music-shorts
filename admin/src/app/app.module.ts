import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {provideFunctions, getFunctions} from '@angular/fire/functions';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {SignInComponent} from './view/sign-in/sign-in.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, DashboardComponent, SignInComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
