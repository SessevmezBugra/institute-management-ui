import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, map, merge, mergeMap, of, withLatestFrom } from "rxjs";
import { trainingActions } from  "./training.actions";
import { NgrxDialogFacade } from "src/app/core/ngrx-dialog";
import { TrainingService } from "./training.service";
import { TrainingFacade } from "./training.facade";

export const loadTrainingByTrainingId$ = createEffect(
  (
    actions$ = inject(Actions),
    trainingService = inject(TrainingService),
  ) => {
    return actions$.pipe(
      ofType(trainingActions.loadTrainingByTrainingId),
      concatMap((action) =>
      trainingService.getTrainingByTrainingId(action.trainingId).pipe(
          map((results) =>
          trainingActions.loadTrainingByTrainingIdSuccess({training: results}),
          ),
          catchError((error) => of(trainingActions.loadTrainingByTrainingIdFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const loadTrainingSections$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
    ) => {
      return actions$.pipe(
        ofType(
          trainingActions.loadTrainingSections, 
          trainingActions.loadTrainingByTrainingIdSuccess, 
          trainingActions.createTrainingSectionSuccess,
          trainingActions.updateTrainingSectionSuccess,
          trainingActions.deleteTrainingSectionSuccess),
        withLatestFrom(trainingFacade.trainingId$),
        concatMap(([_, trainingId]) =>
        trainingService.getTrainingSectionsByTrainingId(trainingId).pipe(
            map((results) =>
            trainingActions.loadTrainingSectionsSuccess({trainingSections: results}),
            ),
            catchError((error) => of(trainingActions.loadTrainingSectionsFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );

  export const loadTrainingMoves$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
    ) => {
      return actions$.pipe(
        ofType(
          trainingActions.loadTrainingMove, 
          trainingActions.createTrainingMoveSuccess,
          trainingActions.updateTrainingMoveSuccess,
          trainingActions.deleteTrainingMoveSuccess),
        withLatestFrom(trainingFacade.trainingId$, trainingFacade.sectionId$),
        concatMap(([_, trainingId, sectionId]) =>
        trainingService.getTrainingMovesByTrainingIdAndSectionId(trainingId, sectionId).pipe(
            map((results) =>
            trainingActions.loadTrainingMoveSuccess({trainingMoves: results}),
            ),
            catchError((error) => of(trainingActions.loadTrainingMoveFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );

  export const createTrainingSection$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
      ngrxDialogFacade = inject(NgrxDialogFacade),
    ) => {
      return actions$.pipe(
        ofType(trainingActions.createTrainingSection),
        withLatestFrom(trainingFacade.trainingId$, ngrxDialogFacade.formDialogFormData$),
        concatMap(([_, trainingId, formDialogFormData]) =>
        trainingService.createTrainingSection(trainingId, formDialogFormData).pipe(
            map((results) =>
            trainingActions.createTrainingSectionSuccess(),
            ),
            catchError((error) => of(trainingActions.createTrainingSectionFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );

  export const updateTrainingSection$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
      ngrxDialogFacade = inject(NgrxDialogFacade),
    ) => {
      return actions$.pipe(
        ofType(trainingActions.updateTrainingSection),
        withLatestFrom(trainingFacade.trainingId$, ngrxDialogFacade.formDialogFormData$),
        concatMap(([_, trainingId, formDialogFormData]) =>
        trainingService.updateTrainingSection(trainingId, formDialogFormData).pipe(
            map((results) =>
            trainingActions.updateTrainingSectionSuccess(),
            ),
            catchError((error) => of(trainingActions.updateTrainingSectionFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );

  export const createTrainingMove$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
      ngrxDialogFacade = inject(NgrxDialogFacade),
    ) => {
      return actions$.pipe(
        ofType(trainingActions.createTrainingMove),
        withLatestFrom(trainingFacade.trainingId$, trainingFacade.sectionId$,ngrxDialogFacade.formDialogFormData$),
        concatMap(([_, trainingId, sectionId, formDialogFormData]) =>
        trainingService.createTrainingMove(trainingId, sectionId, formDialogFormData).pipe(
            map((results) =>
            trainingActions.createTrainingMoveSuccess(),
            ),
            catchError((error) => of(trainingActions.createTrainingMoveFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );

  export const updateTrainingMove$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
      ngrxDialogFacade = inject(NgrxDialogFacade),
    ) => {
      return actions$.pipe(
        ofType(trainingActions.updateTrainingMove),
        withLatestFrom(trainingFacade.trainingId$, trainingFacade.sectionId$,ngrxDialogFacade.formDialogFormData$),
        concatMap(([_, trainingId, sectionId, formDialogFormData]) =>
        trainingService.updateTrainingMove(trainingId, sectionId, formDialogFormData).pipe(
            map((results) =>
            trainingActions.updateTrainingMoveSuccess(),
            ),
            catchError((error) => of(trainingActions.updateTrainingMoveFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );

  export const deleteTrainingSection$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
    ) => {
      return actions$.pipe(
        ofType(trainingActions.deleteTrainingSection),
        withLatestFrom(trainingFacade.trainingId$, trainingFacade.sectionId$),
        concatMap(([_, trainingId, sectionId]) =>
        trainingService.deleteTrainingSectionById(trainingId, sectionId).pipe(
            map((results) =>
            trainingActions.deleteTrainingSectionSuccess(),
            ),
            catchError((error) => of(trainingActions.deleteTrainingSectioFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );

  export const deleteTrainingMove$ = createEffect(
    (
      actions$ = inject(Actions),
      trainingService = inject(TrainingService),
      trainingFacade = inject(TrainingFacade),
    ) => {
      return actions$.pipe(
        ofType(trainingActions.deleteTrainingMove),
        withLatestFrom(trainingFacade.trainingId$, trainingFacade.sectionId$),
        concatMap(([action, trainingId, sectionId]) =>
        trainingService.deleteTrainingMoveById(trainingId, sectionId, action.id).pipe(
            map((results) =>
            trainingActions.deleteTrainingMoveSuccess(),
            ),
            catchError((error) => of(trainingActions.deleteTrainingMoveFail({ error }))),
          ),
        ),
      );
    },
    { functional: true },
  );