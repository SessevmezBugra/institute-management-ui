import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { filter, map, of, take, withLatestFrom } from 'rxjs';
import { TrainingListFacade } from 'src/app/containers/training-list/data-access/+state/training-list.facade';
import { AuthFacade } from 'src/app/core/auth';


export const trainingListResolver: ResolveFn<boolean> = () => {
  const authFacade = inject(AuthFacade);
  const trainingListFacade = inject(TrainingListFacade);
  const logger = inject(NGXLogger);

  return authFacade.isLoggedIn$.pipe(
    filter((isLoggedIn) => {
      logger.log("trainingListResolver" , "isLoggedIn", isLoggedIn)
      return isLoggedIn
    }),
    take(1),
    withLatestFrom(authFacade.userProfile$),
    map(([isLoggedIn, userProfile]) => {
      logger.log("trainingListResolver", "userProfile", userProfile)
      trainingListFacade.loadTrainingsByUserId(userProfile.id!);
      return true;
    })
  );
};
