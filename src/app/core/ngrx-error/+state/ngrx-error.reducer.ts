import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as NgrxErrorActions from './ngrx-error.actions';

export const ngrxErrorFeatureKey = 'ngrxError';

export interface ErrorHandlerState {
  code: number;
  message: string | undefined;
}

export const errorHandlerInitialState: ErrorHandlerState = {
  message: undefined,
  code: -1,
};

export const ngrxErrorFeature = createFeature({
  name: ngrxErrorFeatureKey,
  reducer: createReducer(
    errorHandlerInitialState,
    on(NgrxErrorActions.throw401Error, (state, action) => ({
      code: action.error.status,
      message: action.error.message,
    })),
    on(NgrxErrorActions.throw404Error, (state, action) => ({
      code: action.error.status,
      message: action.error.message,
    })),
  ),
});


