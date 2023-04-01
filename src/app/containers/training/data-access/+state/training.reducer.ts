import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";

export interface TrainingState {
    training: TrainingEntity;
    sections: Array<TrainingSectionEntity>;
    moves: Array<TrainingMoveEntity>;
}