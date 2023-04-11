import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { TrainingFacade } from '../+state/training.facade';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';

export const trainingResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const trainingFacade = inject(TrainingFacade);
  const logger = inject(NGXLogger);
  const trainingId = route.params['trainingId'];
  trainingFacade.loadTrainingByTrainingId(trainingId);
  return of(true);
};

