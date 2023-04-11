import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TrainingState } from "./training.reducer";
import { trainingQuery } from "./training.selectors";
import { trainingActions } from  "./training.actions";

@Injectable({ providedIn: 'root' })
export class TrainingFacade {

    trainingId$ = this.store.select(trainingQuery.getTrainingId);
    sectionId$ = this.store.select(trainingQuery.getSectionId);
    sections$ = this.store.select(trainingQuery.getSections);
    moves$ = this.store.select(trainingQuery.getMoves);

    constructor(private store: Store<TrainingState>) { }

    loadTrainingByTrainingId(trainingId: string) {
        this.store.dispatch(trainingActions.loadTrainingByTrainingId({trainingId}));
    }

    createTrainingSection() {
        this.store.dispatch(trainingActions.createTrainingSection());
    }

    updateTrainingSection() {
        this.store.dispatch(trainingActions.updateTrainingSection());
    }

    createTrainingMove() {
        this.store.dispatch(trainingActions.createTrainingMove());
    }

    updateTrainingMove() {
        this.store.dispatch(trainingActions.updateTrainingMove());
    }

    loadTrainingSections() {
        this.store.dispatch(trainingActions.loadTrainingSections());
    }

    loadTrainingMoves(sectionId: string) {
        this.store.dispatch(trainingActions.loadTrainingMove({sectionId}));
    }

    deleteTrainingSeciton(id: string) {
        this.store.dispatch(trainingActions.deleteTrainingSection({id}));
    }

    deleteTrainingMove(id: string) {
        this.store.dispatch(trainingActions.deleteTrainingMove({id}));
    }
}