import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-o-auth-spotify-callback',
  templateUrl: './o-auth-spotify-callback.component.html',
  styleUrls: ['./o-auth-spotify-callback.component.scss'],
})
export class OAuthSpotifyCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    window.postMessage({code});
  }
}
