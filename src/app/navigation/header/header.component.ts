import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State, getIsAuthFromState } from './../../app.reducer';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(getIsAuthFromState);
  }

  onLogout() {
    this.authService.logOut();
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }

}
