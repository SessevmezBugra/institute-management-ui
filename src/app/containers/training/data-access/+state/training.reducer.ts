import { createFeature, createReducer, on } from "@ngrx/store";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";
import { trainingActions } from  "./training.actions";

export interface TrainingState {
    training: {
        id: string;
        name: string;
        desc: string;
    };
    sections: Array<TrainingSectionEntity>;
    moves: Array<TrainingMoveEntity>;
    sectionId: string;
}

export const trainingFeatureKey = "training";

export const trainingInitialState: TrainingState = {
    training: {
        id: '',
        name: '',
        desc: ''
    },
    sections: [],
    moves: [],
    sectionId: ""
}
  
  export const trainingFeature = createFeature({
    name: trainingFeatureKey,
    reducer: createReducer(
        trainingInitialState,
      on(trainingActions.loadTrainingByTrainingIdSuccess, (state, action) => ({
        ...state,
        training: action.training
      })),
      on(trainingActions.loadTrainingMove, (state, action) => ({
        ...state,
        sectionId: action.sectionId
      })),
      on(trainingActions.loadTrainingSectionsSuccess, (state, action) => ({
        ...state,
        sections: action.trainingSections
      })),
      on(trainingActions.loadTrainingMoveSuccess, (state, action) => ({
        ...state,
        moves: action.trainingMoves
      }))
    )
  });