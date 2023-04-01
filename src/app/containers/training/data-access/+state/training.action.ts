import { createActionGroup, props } from "@ngrx/store";
import { TrainingEntity } from "src/app/core/model/entity/training-entity.model";

export const trainingActions = createActionGroup({
    source: 'Training',
    events: {
      'Load Training By User Id': props<{ userId: string }>(),
      'Load Training By User Id Success': props<{ training: TrainingEntity }>(),
      'Load Training By User Id Failure': props<{ error: Error }>(),
    },
  });
  