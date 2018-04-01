import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State, getIsAuthFromState } from './../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<State>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(getIsAuthFromState).pipe(take(1));
  }

  canLoad(route: Route) {
    return this.store.select(getIsAuthFromState).pipe(take(1));
  }
}
