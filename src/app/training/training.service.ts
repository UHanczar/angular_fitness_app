import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { Exercise } from './exercise.model';
import { UiService } from './../shared/ui.service';
import * as Ui from './../shared/ui.actions';
import * as Training from './training.actions';
import { State as RootState, getActiveTraining } from './training.reducer';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<RootState>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new Ui.StartLoading());
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => docArray.map(doc => ({
        ...doc.payload.doc.data(),
        id: doc.payload.doc.id
      })))
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Ui.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
      }, (error) => {
        this.store.dispatch(new Ui.StopLoading());
        this.uiService.showSnackBar(error.message, null, 3000);
      }));
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges()
      .subscribe((exercises: Exercise[]) =>
        this.store.dispatch(new Training.SetFinishedTrainings(exercises)), (error) => console.log('ERROR', error)));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  cancelExercise(progress: number) {
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        duration: exercise.duration * (progress / 100),
        calories: exercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });

      this.store.dispatch(new Training.StopTraining());
    });
  }

  completeExercise() {
    this.store.select(getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: 'completed'
      });

      this.store.dispatch(new Training.StopTraining());
    });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
      ;
  }

  cancelSubscription() {
    if (this.fbSubs) {
      this.fbSubs.forEach(sub => sub && sub.unsubscribe());
    }
  }
}
