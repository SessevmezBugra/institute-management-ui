import { Action, createFeature, createReducer, on } from "@ngrx/store";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";
import * as TrainingActions from "./training-list.actions";

export const trainingListFeatureKey = "training-list";

export interface TrainingListState {
  trainings: Array<TrainingEntity>;
  userId: string;
}

export interface TrainingListRootState {
  readonly [trainingListFeatureKey]: TrainingListState;
}

export const trainingListInitialState: TrainingListState = {
  trainings: [],
  userId: '',
}

export const trainingListFeature = createFeature({
  name: trainingListFeatureKey,
  reducer: createReducer(
    trainingListInitialState,
    on(TrainingActions.loadTrainingsByUserIdSucces, (state, action) => ({
      ...state,
      trainings: action.trainings
    })),
    on(TrainingActions.loadTrainingsByUserId, (state, action) => ({
      ...state,
      userId: action.userId
    }))
  )
});


