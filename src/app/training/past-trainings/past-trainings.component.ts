import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';
// import { take } from 'rxjs/operators';

import { State as RootState, getFinishedExercises } from './../training.reducer';
import { Exercise } from './../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(
    private trainingService: TrainingService,
    private store: Store<RootState>
  ) { }

  ngOnInit() {
    this.store.select(getFinishedExercises).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
