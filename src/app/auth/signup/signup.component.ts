import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State as RootState, getIsLoadingFromState } from '../../app.reducer';
import { AuthService } from './../auth.service';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: RootState}>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoadingFromState);

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 14);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
