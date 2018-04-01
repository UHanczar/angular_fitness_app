import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State, getIsAuthFromState } from './../../app.reducer';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(getIsAuthFromState);
  }

  onLogout() {
    this.onSidenavClose();
    this.authService.logOut();
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }
}
