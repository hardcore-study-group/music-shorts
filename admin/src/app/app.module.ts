import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {DashboardComponent} from './view/dashboard/dashboard.component';
import {SignInComponent} from './view/sign-in/sign-in.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {
  AngularFireFunctionsModule,
  USE_EMULATOR,
} from '@angular/fire/compat/functions';
import {OAuthSpotifyCallbackComponent} from './view/o-auth-spotify-callback/o-auth-spotify-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    OAuthSpotifyCallbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  providers: [{provide: USE_EMULATOR, useValue: ['localhost', 5001]}],
  bootstrap: [AppComponent],
})
export class AppModule {}
