import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, map, merge, mergeMap, of, withLatestFrom } from "rxjs";
import * as TrainingActions from "./training-list.actions";
import { TrainingListFacade } from "./training-list.facade";
import { TrainingListService } from "./training-list.service";



// export const loadTrainingByUserId$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(TrainingActions.setUserId, TrainingActions.loadTrainings),
//             withLatestFrom(this.trainingFacade.userId$),
//             concatMap(([_, userId]) =>
//                 this.trainingService.getTrainingsByUserId(userId).pipe(
//                     map((response) => TrainingActions.loadTrainingsSucces({ trainings: response })),
//                     catchError((error) => of(TrainingActions.loadTrainingsFail(error))),
//                 ),
//             ),
//         ),
//     );

    export const loadTrainingByUserId$ = createEffect(
        (actions$ = inject(Actions), trainingListService = inject(TrainingListService)) => {
          return actions$.pipe(
            ofType(TrainingActions.loadTrainingsByUserId),
            concatMap((action) =>
            trainingListService.getTrainingsByUserId(action.userId).pipe(
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

    // createTraining = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.createTraining),
    //         withLatestFrom(this.ngrxDialogFacade.formDialogFormData$, this.trainingFacade.userId$),
    //         concatMap(([_, data, userId]) => 
    //             this.trainingService.createTraining({...data, userId: userId}).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainings(), TrainingActions.createTrainingSuccess()]),
    //                 catchError((error) => of(TrainingActions.createTrainingFail(error))),
    //             ),
    //         ),
    //     ),
    // );

    // updateTraining = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.updateTraining),
    //         withLatestFrom(this.ngrxDialogFacade.formDialogFormData$, this.trainingFacade.userId$),
    //         concatMap(([_, data, userId]) => 
    //             this.trainingService.updateTraining({...data, userId: userId}).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainings(), TrainingActions.updateTrainingSuccess()]),
    //                 catchError((error) => of(TrainingActions.updateTrainingFail(error))),
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

    // deleteTraining = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(TrainingActions.deleteTraining),
    //         concatMap((action) => 
    //             this.trainingService.deleteTrainingById(action.id).pipe(
    //                 mergeMap((response) => [TrainingActions.loadTrainings(), TrainingActions.deleteTrainingSucces()]),
    //                 catchError((error) => of(TrainingActions.deleteTrainingFail(error))),
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

