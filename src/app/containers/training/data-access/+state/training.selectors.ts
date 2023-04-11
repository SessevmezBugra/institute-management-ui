import { createFeatureSelector, createSelector } from "@ngrx/store";
import { trainingFeatureKey, TrainingState } from "./training.reducer";

const getTraining = createFeatureSelector<TrainingState>(trainingFeatureKey);
export const getTrainingId = createSelector(getTraining, (state: TrainingState) => state.training.id);
export const getSectionId = createSelector(getTraining, (state: TrainingState) => state.sectionId);
export const getSections = createSelector(getTraining, (state: TrainingState) => state.sections);
export const getMoves = createSelector(getTraining, (state: TrainingState) => state.moves);

export const trainingQuery = {
    getTrainingId,
    getSectionId,
    getSections,
    getMoves,
};
