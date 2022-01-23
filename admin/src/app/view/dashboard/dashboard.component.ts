import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {from, Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {}

  signOut() {
    from(this.auth.signOut()).subscribe(() =>
      this.router.navigate(['sign-in']),
    );
  }
}
