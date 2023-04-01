import { TrainingSectionEntity } from "./training-section-entity.model";

export interface TrainingMoveEntity {
    id: string;
    section: TrainingSectionEntity;
    name: string;
    setNumber: string;
    repetitionNumber: string;
    createdDate: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
}