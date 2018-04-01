import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State as RootState, getIsTraining } from './training.reducer';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<RootState>
  ) { }

  ngOnInit() {
    this.onGoingTraining$ = this.store.select(getIsTraining);
  }
}
