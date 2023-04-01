import { TrainingSectionEntity } from "./training-section-entity.model";

export interface TrainingEntity {
    id: string;
    name: string;
    desc: string;
    userId: string;
    createdDate: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    sections: Array<TrainingSectionEntity>
}