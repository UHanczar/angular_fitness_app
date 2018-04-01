import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State as RootState, getIsLoadingFromState } from '../../app.reducer';
import { AuthService } from './../auth.service';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ui: RootState}>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoadingFromState);

    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
