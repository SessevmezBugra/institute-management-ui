import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/http-client/api.service";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";

@Injectable({ providedIn: 'root' })
export class TrainingService {

    constructor(private apiService: ApiService) { }

    getTrainingByTrainingId(trainingId: string): Observable<TrainingEntity> {
        return this.apiService.get('/training/' + trainingId);
    }

    getTrainingSectionsByTrainingId(trainingId: string): Observable<Array<TrainingSectionEntity>> {
        return this.apiService.get('/training/' + trainingId + "/section");
    }

    createTrainingSection(trainingId: string, section: TrainingSectionEntity): Observable<void> {
        return this.apiService.post('/training/' + trainingId + "/section", section);
    }

    updateTrainingSection(trainingId: string, section: TrainingSectionEntity): Observable<void> {
        return this.apiService.put('/training/' + trainingId + "/section", section);
    }

    getTrainingMovesByTrainingIdAndSectionId(trainingId: string, sectionId: string): Observable<Array<TrainingMoveEntity>> {
        return this.apiService.get('/training/' + trainingId + "/section/" + sectionId + "/move");
    }

    createTrainingMove(trainingId: string, sectionId: string, section: TrainingMoveEntity): Observable<void> {
        return this.apiService.post('/training/' + trainingId + "/section/" + sectionId + "/move", section);
    }

    updateTrainingMove(trainingId: string, sectionId: string, section: TrainingMoveEntity): Observable<void> {
        return this.apiService.put('/training/' + trainingId + "/section/" + sectionId + "/move", section);
    }

    deleteTrainingSectionById(trainingId: string, sectionId: string): Observable<void> {
        return this.apiService.delete('/training/' + trainingId + '/section/' + sectionId);
    }

    deleteTrainingMoveById(trainingId: string, sectionId: string, moveId: string): Observable<void> {
        return this.apiService.delete('/training/' + trainingId + '/section/' + sectionId + '/move/' + moveId);
    }

}