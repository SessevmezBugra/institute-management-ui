import { Action, createFeature, createReducer, on } from "@ngrx/store";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";
import * as TrainingActions from "./training-list.actions";

export const trainingListFeatureKey = "training-list";

export interface TrainingListState {
  trainings: Array<TrainingEntity>;
  sections: Array<TrainingSectionEntity>;
  moves: Array<TrainingMoveEntity>;
  userId: string;
  trainingId: string;
  sectionId: string;
}

export interface TrainingListRootState {
  readonly [trainingListFeatureKey]: TrainingListState;
}

export const trainingListInitialState: TrainingListState = {
  trainings: [],
  moves: [],
  sections: [],
  userId: '',
  trainingId: '',
  sectionId: '',
}

export const trainingListFeature = createFeature({
  name: trainingListFeatureKey,
  reducer: createReducer(
    trainingListInitialState,
    on(TrainingActions.loadTrainingsByUserIdSucces, (state, action) => ({
      ...state,
      trainings: action.trainings
    })),
    on(TrainingActions.setUserId, (state, action) => ({
      ...state,
      userId: action.userId
    })),
    on(TrainingActions.setTrainingId, (state, action) => ({
      ...state,
      trainingId: action.trainingId
    })),
    on(TrainingActions.loadTrainingSectionsSucces, (state, action) => ({
      ...state,
      sections: action.trainingSections
    })),
    on(TrainingActions.loadTrainingMovesSucces, (state, action) => ({
      ...state,
      moves: action.trainingMoves
    })),
    on(TrainingActions.setSectionId, (state, action) => ({
      ...state,
      sectionId: action.sectionId
    })),
  )
});


