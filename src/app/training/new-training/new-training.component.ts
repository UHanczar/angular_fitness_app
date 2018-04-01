import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State as RootState, getAvailableExercises } from './../training.reducer';
import { getIsLoadingFromState } from './../../app.reducer';
import { UiService } from './../../shared/ui.service';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<RootState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoadingFromState);
    this.exercises$ = this.store.select(getAvailableExercises);
    this.fetchAvailableExercises();
  }

  fetchAvailableExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
