import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
  BehaviorSubject,
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

export interface Track {
  id: string;
  created_at: Date;
  spotify_id: string;
  name: string;
  artist_names: string[];
  image: string;
  preview_url: string;
  duration_ms: number;
  add_user_id: string;
  spotify_data: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  myControl = new FormControl();
  searchedTracks?: Observable<SearchTrack[]>;
  dataSource?: Observable<Track[]>;
  page = new BehaviorSubject(1);

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

    this.dataSource = this.page
      .asObservable()
      .pipe(switchMap(page => this.getTracks(page)));
  }

  nextPage() {
    this.page.next(this.page.value + 1);
  }
  prevPage() {
    if (this.page.value === 1) return;
    this.page.next(this.page.value - 1);
  }

  private getTracks(page: number) {
    return this.functions.httpsCallable<
      {limit: number; offset: number},
      Track[]
    >('getTracks')({offset: (page - 1) * 20, limit: 20});
  }

  private search(query: string) {
    return this.functions.httpsCallable<SearchParam, {items: SearchTrack[]}>(
      'searchTracks',
    )({query, limit: 20});
  }

  deleteTrack(id: string) {
    if (!confirm('Are you sure to delete?')) return;
    const callable = this.functions.httpsCallable<{id: string}>('removeTrack')({
      id,
    });
    callable.subscribe({
      error: e => alert(e.message),
      complete: () => this.page.next(this.page.value),
    });
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
      complete: () => this.page.next(1),
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
