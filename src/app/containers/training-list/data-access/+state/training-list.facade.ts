import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TrainingListState } from "./training-list.reducer";
import { trainingQuery } from "./training-list.selectors";
import * as TrainingActions from "./training-list.actions";

@Injectable({ providedIn: 'root' })
export class TrainingListFacade {

    trainings$ = this.store.select(trainingQuery.getTrainingsByUserId);
    userId$ = this.store.select(trainingQuery.getUserId);

    constructor(private store: Store<TrainingListState>) { }
    
    loadTrainingsByUserId(userId: string) {
        this.store.dispatch(TrainingActions.loadTrainingsByUserId({userId}));
    }

    createTraining() {
        this.store.dispatch(TrainingActions.createTraining());
    }

    updateTraining() {
        this.store.dispatch(TrainingActions.updateTraining());
    }

    deleteTraining(id: string) {
        this.store.dispatch(TrainingActions.deleteTraining({id}));
    }
}