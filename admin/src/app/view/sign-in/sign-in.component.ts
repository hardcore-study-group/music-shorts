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
    const callable = this.functions.httpsCallable<any, string>(
      'getSpotifyOAuthUrl',
    )({});
    callable.subscribe(url => {
      const w = window.open(
        'https://auth.music-shorts.com/spotify/callback.html',
        'spotify',
        'toolbar=no, menubar=no, width=600, height=700, top=100, left=100',
      );
      w?.addEventListener('load', () => console.log('loaded'));
      w?.addEventListener('close', () => console.log('closed'));
      w?.addEventListener('message', event => console.log(event), false);
    });
  }
}
