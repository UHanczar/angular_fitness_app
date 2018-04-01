import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';

import { State as RootState } from './../app.reducer';
import * as UI from './../shared/ui.actions';
import * as AUTH from './auth.actions';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from './../training/training.service';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<RootState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.authSuccessfully();
      } else {
        this.unAuthSuccessfully();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  loginUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
    .signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.store.dispatch(new UI.StopLoading());
    })
    .catch(error => {
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  private authSuccessfully() {
    this.store.dispatch(new AUTH.SetAuthenticated());
    this.router.navigate(['/training']);
  }

  private unAuthSuccessfully() {
    this.trainingService.cancelSubscription();
    this.store.dispatch(new AUTH.SetUnAuthenticated());
    this.router.navigate(['/login']);
  }
}
