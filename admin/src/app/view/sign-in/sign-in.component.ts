import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFireFunctions} from '@angular/fire/compat/functions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    public auth: AngularFireAuth,
    public functions: AngularFireFunctions,
  ) {}

  ngOnInit(): void {}

  onSigninWithSpotify() {
    const getSpotifyOAuthUrl = this.functions.httpsCallable<any, string>(
      'getSpotifyOAuthUrl',
    );
    const getSpotifyFirebaseCustomToken = this.functions.httpsCallable<
      {spotifyCode: string},
      string
    >('getSpotifyFirebaseCustomToken');

    getSpotifyOAuthUrl({}).subscribe(url => {
      const popup = window.open(
        url,
        'spotify',
        'toolbar=no, menubar=no, width=600, height=700, top=100, left=100',
      );
      popup?.addEventListener(
        'message',
        event => {
          const code = event.data.code;
          if (!code) return;
          popup.close();
          getSpotifyFirebaseCustomToken({spotifyCode: code}).subscribe(
            token => {
              this.auth.signInWithCustomToken(token);
            },
          );
        },
        false,
      );
    });
  }
}
