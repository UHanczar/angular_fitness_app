import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {
  constructor(
    private snackBar: MatSnackBar
  ) {}
  loadingStateChanged = new Subject<boolean>();

  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, { duration });
  }
}
