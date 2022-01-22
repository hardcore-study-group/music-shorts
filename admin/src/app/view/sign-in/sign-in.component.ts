import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  // constructor(private auth: Auth, private functions: Functions) {}

  ngOnInit(): void {}

  onSigninWithSpotify() {
    // const callable = this.functions.httpsCallable<any, string>(
    //   'getSpotifyOAuthUrl',
    // )({});
    // callable.subscribe(url => window.open(url, '_blank'));
  }
}
