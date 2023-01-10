import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { login } from '../../auth/+state/auth.actions';
import * as NgrxErrorActions from './ngrx-error.actions';

@Injectable()
export class NgrxErrorEffects {
  error401$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NgrxErrorActions.throw401Error),
      map(_ => login()),
    ),
  );

  error404$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NgrxErrorActions.throw404Error),
        tap(() => this.router.navigate(['/'])),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private router: Router) {}
}
