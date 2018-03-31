import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exercisesSubscription: Subscription;
  isExercisesLoaded = false;

  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.exercisesSubscription = this.trainingService.exercisesChanged.
      subscribe(exercises => {
        this.isExercisesLoaded = true;
        console.log('EEEEE', this.exercises, this.isExercisesLoaded);
        this.exercises = exercises;
      }, error => this.isExercisesLoaded = true);
    this.fetchAvailableExercises();
  }

  fetchAvailableExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
