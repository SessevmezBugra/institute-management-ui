import { createFeatureSelector, createSelector } from "@ngrx/store";
import { trainingListFeatureKey, TrainingListState } from "./training-list.reducer";

const getTraining = createFeatureSelector<TrainingListState>(trainingListFeatureKey);
export const getTrainingsByUserId = createSelector(getTraining, (state: TrainingListState) => state.trainings);
export const getUserId = createSelector(getTraining, (state: TrainingListState) => state.userId);

export const trainingQuery = {
    getUserId,
    getTrainingsByUserId,
};
