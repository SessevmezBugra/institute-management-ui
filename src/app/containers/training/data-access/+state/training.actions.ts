import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";
import { TrainingMoveEntity } from "src/app/core/model/entity/training-move-entity.model";
import { TrainingSectionEntity } from "src/app/core/model/entity/training-section-entity.model";

export const trainingActions = createActionGroup({
    source: 'Training',
    events: {
      'Load Training By Training Id': props<{ trainingId: string }>(),
      'Load Training By Training Id Success': props<{ training: TrainingEntity }>(),
      'Load Training By Training Id Failure': props<{ error: Error }>(),

      'Create Training Section': emptyProps(),
      'Create Training Section Success': emptyProps(),
      'Create Training Section Fail': props<{ error: Error }>(),
      'Update Training Section': emptyProps(),
      'Update Training Section Success': emptyProps(),
      'Update Training Section Fail': props<{ error: Error }>(),
      'Load Training Sections': emptyProps(),
      'Load Training Sections Success': props<{ trainingSections: Array<TrainingSectionEntity> }>(),
      'Load Training Sections Fail': props<{ error: Error }>(),
      'Delete Training Section': props<{ id: string }>(),
      'Delete Training Section Success': emptyProps(),
      'Delete Training Sectio Fail': props<{ error: Error }>(),

      'Create Training Move': emptyProps(),
      'Create Training Move Success': emptyProps(),
      'Create Training Move Fail': props<{ error: Error }>(),
      'Update Training Move': emptyProps(),
      'Update Training Move Success': emptyProps(),
      'Update Training Move Fail': props<{ error: Error }>(),
      'Load Training Move': props<{ sectionId: string }>(),
      'Load Training Move Success': props<{ trainingMoves: Array<TrainingMoveEntity> }>(),
      'Load Training Move Fail': props<{ error: Error }>(),
      'Delete Training Move': props<{ id: string }>(),
      'Delete Training Move Success': emptyProps(),
      'Delete Training Move Fail': props<{ error: Error }>(),
    },
  });