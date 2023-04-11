import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/app/core/http-client/api.service";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";

@Injectable({ providedIn: 'root' })
export class TrainingListService {

    constructor(private apiService: ApiService) { }

    getTrainingsByUserId(userId: string | null | undefined): Observable<Array<TrainingEntity>> {
        var params = new HttpParams();
        if(userId) {
            params = new HttpParams().append("userId", userId);
        }
        return this.apiService.get('/training', params);
    }

    createTraining(training: TrainingEntity): Observable<void> {
        return this.apiService.post('/training', training);
    }

    updateTraining(training: TrainingEntity): Observable<void> {
        return this.apiService.put('/training', training);
    }

    deleteTrainingById(trainingId: string): Observable<void> {
        return this.apiService.delete('/training/' + trainingId);
    }

}