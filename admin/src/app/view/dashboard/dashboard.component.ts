import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {
  from,
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith,
  map,
  filter,
  catchError,
  pipe,
} from 'rxjs';
import {FormControl} from '@angular/forms';
import {AngularFireFunctions} from '@angular/fire/compat/functions';
export interface SearchTrack {
  id: string;
  name: string;
  preview_url?: string;
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    images: {url: string}[];
  };
}
export interface SearchParam {
  query: string;
  offset?: number;
  limit?: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myControl = new FormControl();
  searchedTracks?: Observable<SearchTrack[]>;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private functions: AngularFireFunctions,
  ) {}

  ngOnInit() {
    this.searchedTracks = this.myControl.valueChanges.pipe(
      filter(q => !!q),
      filter(q => typeof q === 'string'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(query => this.search(query)),
      map(track => track.items),
    );
  }

  private search(query: string) {
    return this.functions.httpsCallable<SearchParam, {items: SearchTrack[]}>(
      'searchTracks',
    )({query, limit: 20});
  }

  addTrack(id: string) {
    if (!confirm('Are you sure to add?')) return;
    const callable = this.functions.httpsCallable<
      {spotifyTrackId: string},
      string
    >('addTrack')({
      spotifyTrackId: id,
    });
    callable.subscribe({
      error: e => alert(e.message),
    });
  }

  artistDisplay(
    artists: {
      id: string;
      name: string;
    }[],
  ) {
    return artists.map(v => v.name).join(', ');
  }

  signOut() {
    from(this.auth.signOut()).subscribe(() =>
      this.router.navigate(['sign-in']),
    );
  }
}
