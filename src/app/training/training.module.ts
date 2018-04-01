import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from './../shared/shared.module';
import { trainingReducer } from './training.reducer';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
