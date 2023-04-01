import { TrainingEntity } from "./training-entity.model";
import { TrainingMoveEntity } from "./training-move-entity.model";

export interface TrainingSectionEntity {
    id: string;
    training: TrainingEntity;
    parent: TrainingSectionEntity;
    name: string;
    desc: string;
    createdDate: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    moves: Array<TrainingMoveEntity>;
    childs: Array<TrainingSectionEntity>;
}