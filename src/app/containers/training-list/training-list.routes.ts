import { Routes } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideState } from "@ngrx/store";
import { trainingListFeature } from "./data-access/+state/training-list.reducer";
import { TrainingListComponent } from "./training-list.component";
import * as trainingListEffects from "./data-access/+state/training-list.effects";
import { TrainingListFacade } from "./data-access/+state/training-list.facade";

export const ARTICLE_ROUTES: Routes = [
    {
      path: '',
      component: TrainingListComponent,
      providers: [provideState(trainingListFeature), provideEffects(trainingListEffects), TrainingListFacade],
    },
  ];
  