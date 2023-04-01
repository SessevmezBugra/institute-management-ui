import { createFeatureSelector, createSelector } from "@ngrx/store";
import { trainingListFeatureKey, TrainingListState } from "./training-list.reducer";

const getTraining = createFeatureSelector<TrainingListState>(trainingListFeatureKey);
export const getTrainingsByUserId = createSelector(getTraining, (state: TrainingListState) => state.trainings);
export const getUserId = createSelector(getTraining, (state: TrainingListState) => state.userId);
export const getTrainingId = createSelector(getTraining, (state: TrainingListState) => state.trainingId);
export const getSectionId = createSelector(getTraining, (state: TrainingListState) => state.sectionId);
export const getSections = createSelector(getTraining, (state: TrainingListState) => state.sections);
export const getMoves = createSelector(getTraining, (state: TrainingListState) => state.moves);

export const trainingQuery = {
    getUserId,
    getTrainingsByUserId,
    getTrainingId,
    getSectionId,
    getSections,
    getMoves,
};
