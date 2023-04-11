import { createAction, props } from "@ngrx/store";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";

export const loadTrainingsByUserId = createAction('[training-list] LOAD_TRAININGS_BY_USER_ID', props<{ userId: string }>());

export const loadTrainingsByUserIdSucces = createAction('[training-list] LOAD_TRAININGS_BY_USER_ID_SUCCESS', props<{ trainings: Array<TrainingEntity> }>());

export const loadTrainingsByUserIdFail = createAction('[training-list] LOAD_TRAININGS_BY_USER_ID_FAIL', props<{ error: Error }>());

export const createTraining = createAction('[training-list] CREATE_TRAINING');

export const createTrainingSuccess = createAction('[training-list] CREATE_TRAINING_SUCCESS');

export const createTrainingFail = createAction('[training-list] CREATE_TRAINING_FAIL', props<{ error: Error }>());

export const updateTraining = createAction('[training-list] UPDATE_TRAINING');

export const updateTrainingSuccess = createAction('[training-list] UPDATE_TRAINING_SUCCESS');

export const updateTrainingFail = createAction('[training-list] UPDATE_TRAINING_FAIL', props<{ error: Error }>());

export const deleteTraining = createAction('[training-list] DELETE_TRAINING', props<{id: string}>());

export const deleteTrainingSucces = createAction('[training-list] DELETE_TRAINING_SUCCESS');

export const deleteTrainingFail = createAction('[training-list] DELETE_TRAINING_FAIL', props<{ error: Error }>());
