import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, map, merge, mergeMap, of, withLatestFrom } from "rxjs";
import * as TrainingActions from "./training-list.actions";
import { TrainingListFacade } from "./training-list.facade";
import { TrainingListService } from "./training-list.service";
import { NgrxDialogFacade } from "src/app/core/ngrx-dialog";

export const loadTrainingByUserId$ = createEffect(
  (
    actions$ = inject(Actions),
    trainingListService = inject(TrainingListService),
    trainingListFacade = inject(TrainingListFacade)
  ) => {
    return actions$.pipe(
      ofType(TrainingActions.loadTrainingsByUserId, TrainingActions.createTrainingSuccess, TrainingActions.updateTrainingSuccess),
      withLatestFrom(trainingListFacade.userId$),
      concatMap(([_, userId]) =>
        trainingListService.getTrainingsByUserId(userId).pipe(
          map((results) =>
            TrainingActions.loadTrainingsByUserIdSucces({
              trainings: results
            }),
          ),
          catchError((error) => of(TrainingActions.loadTrainingsByUserIdFail({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const createTraining$ = createEffect(
  (actions$ = inject(Actions),
    trainingListService = inject(TrainingListService),
    ngrxDialogFacade = inject(NgrxDialogFacade),
    trainingListFacade = inject(TrainingListFacade)) => {
    return actions$.pipe(
      ofType(TrainingActions.createTraining),
      withLatestFrom(ngrxDialogFacade.formDialogFormData$, trainingListFacade.userId$),
      concatMap(([_, data, userId]) =>
        trainingListService.createTraining({ ...data, userId: userId }).pipe(
          map((response) => TrainingActions.createTrainingSuccess()),
          catchError((error) => of(TrainingActions.createTrainingFail(error))),
        ),
      ),
    )
  },
  { functional: true },
);

export const updateTraining$ = createEffect(
  (actions$ = inject(Actions),
    trainingListService = inject(TrainingListService),
    ngrxDialogFacade = inject(NgrxDialogFacade)) => {
    return actions$.pipe(
      ofType(TrainingActions.updateTraining),
      withLatestFrom(ngrxDialogFacade.formDialogFormData$),
      concatMap(([_, data]) =>
        trainingListService.updateTraining({ ...data }).pipe(
          map((response) => TrainingActions.updateTrainingSuccess()),
          catchError((error) => of(TrainingActions.updateTrainingFail(error))),
        ),
      ),
    )
  },
  { functional: true },
);

export const deleteTraining$ = createEffect(
  (actions$ = inject(Actions),
    trainingListService = inject(TrainingListService)) => {
    return actions$.pipe(
      ofType(TrainingActions.deleteTraining),
      concatMap((action) =>
        trainingListService.deleteTrainingById(action.id).pipe(
          map((response) => TrainingActions.deleteTrainingSucces()),
          catchError((error) => of(TrainingActions.deleteTrainingFail(error))),
        ),
      ),
    )
  },
  { functional: true },
);

    // loadTrainingSections = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.setTrainingId, TrainingActions.loadTrainingSections),
    //         withLatestFrom(this.trainingFacade.trainingId$),
    //         concatMap(([_, trainingId]) =>
    //             this.trainingService.getTrainingSectionsByTrainingId(trainingId).pipe(
    //                 map((response) => TrainingActions.loadTrainingSectionsSucces({ trainingSections: response })),
    //                 catchError((error) => of(TrainingActions.loadTrainingSectionsFail(error))),
    //             ),
    //         ),
    //     ),
    // );

    // loadTrainingMoves = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.setSectionId, TrainingActions.loadTrainingMoves),
    //         withLatestFrom(this.trainingFacade.trainingId$, this.trainingFacade.sectionId$),
    //         concatMap(([_, trainingId, sectionId]) =>
    //             this.trainingService.getTrainingMovesByTrainingIdAndSectionId(trainingId, sectionId).pipe(
    //                 map((response) => TrainingActions.loadTrainingMovesSucces({ trainingMoves: response })),
    //                 catchError((error) => of(TrainingActions.loadTrainingMovesFail(error))),
    //             ),
    //         ),
    //     ),
    // );




    // createTrainingSection = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.createTrainingSection),
    //         withLatestFrom(this.trainingFacade.trainingId$, this.ngrxDialogFacade.formDialogFormData$),
    //         concatMap(([_, trainingId, data]) =>
    //             this.trainingService.createTrainingSection(trainingId, data).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainingSections(), TrainingActions.createTrainingSectionSuccess()]),
    //                 catchError((error) => of(TrainingActions.createTrainingSectionFail(error))),
    //             ),
    //         ),
    //     ),
    // );

    // updateTrainingSection = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.updateTrainingSection),
    //         withLatestFrom(this.trainingFacade.trainingId$, this.ngrxDialogFacade.formDialogFormData$),
    //         concatMap(([_, trainingId, data]) =>
    //             this.trainingService.updateTrainingSection(trainingId, data).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainingSections(), TrainingActions.updateTrainingSectionSuccess()]),
    //                 catchError((error) => of(TrainingActions.updateTrainingSectionFail(error))),
    //             ),
    //         ),
    //     ),
    // );

    // createTrainingMove = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.createTrainingMove),
    //         withLatestFrom(this.trainingFacade.trainingId$, this.trainingFacade.sectionId$, this.ngrxDialogFacade.formDialogFormData$),
    //         concatMap(([_, trainingId, sectionId, data]) =>
    //             this.trainingService.createTrainingMove(trainingId, sectionId, data).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainingMoves(), TrainingActions.createTrainingMoveSuccess()]),
    //                 catchError((error) => of(TrainingActions.createTrainingMoveFail(error))),
    //             ),
    //         ),
    //     ),
    // );

    // updateTrainingMove = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.updateTrainingMove),
    //         withLatestFrom(this.trainingFacade.trainingId$, this.trainingFacade.sectionId$, this.ngrxDialogFacade.formDialogFormData$),
    //         concatMap(([_, trainingId, sectionId, data]) =>
    //             this.trainingService.updateTrainingMove(trainingId, sectionId, data).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainingMoves(), TrainingActions.updateTrainingMoveSuccess()]),
    //                 catchError((error) => of(TrainingActions.updateTrainingMoveFail(error))),
    //             ),
    //         ),
    //     ),
    // );



    // deleteTrainingSection = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.deleteTrainingSection),
    //         withLatestFrom(this.trainingFacade.trainingId$, this.trainingFacade.sectionId$),
    //         concatMap(([_, trainingId, sectionId]) =>
    //             this.trainingService.deleteTrainingSectionById(trainingId, sectionId).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainingSections(), TrainingActions.deleteTrainingSectionSucces()]),
    //                 catchError((error) => of(TrainingActions.deleteTrainingSectionFail(error))),
    //             ),
    //         ),
    //     ),
    // );

    // deleteTrainingMove = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.deleteTrainingMove),
    //         withLatestFrom(this.trainingFacade.trainingId$, this.trainingFacade.sectionId$),
    //         concatMap(([{id}, trainingId, sectionId]) =>
    //             this.trainingService.deleteTrainingMoveById(trainingId, sectionId, id).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainingMoves(), TrainingActions.deleteTrainingMoveSucces()]),
    //                 catchError((error) => of(TrainingActions.deleteTrainingMoveFail(error))),
    //             ),
    //         ),
    //     ),
    // );

