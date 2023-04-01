import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { KeycloakService } from "keycloak-angular";
import { catchError, concatMap, map, merge, mergeMap, Observable, of, withLatestFrom } from "rxjs";
import * as AuthActions from "./auth.actions";

@Injectable({ providedIn: 'root' })
export class AuthEffects {

    constructor(private actions$: Actions, private keycloakService: KeycloakService) { }

    login = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login, AuthActions.loginFailed, AuthActions.updateTokenFailed, AuthActions.loadUserProfileFailed),
            concatMap((action) =>
                this.keycloakService.login()
                    .then(() => AuthActions.loginSuccess())
                    .catch((error) => AuthActions.loginFailed(error)),
            ),
        ),
    );

    updateToken = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateToken),
            concatMap((action) =>
                this.keycloakService.updateToken(20)
                    .then((isOk) => {
                        if (isOk) {
                            return AuthActions.updateTokenSuccess();
                        } else {
                            let error = new Error("Update token failed");
                            return AuthActions.updateTokenFailed({ error });
                        }
                    })
                    .catch((error) => AuthActions.updateTokenFailed({ error }))
            ),
        ),
    );

    updateIsLoggedIn = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateIsLoggedIn, AuthActions.initializeKeycloakSuccess),
            concatMap((action) =>
                this.keycloakService.isLoggedIn()
                    .then((isOk) => {
                        if (isOk) {
                            return AuthActions.updateIsLoggedInSuccess();
                        } else {
                            let error = new Error("Update is logged in failed");
                            return AuthActions.updateIsLoggedInFailed({ error });
                        }
                    })
                    .catch((error) => AuthActions.updateIsLoggedInFailed({ error }))
            ),
        ),
    );

    loadUserProfile = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateIsLoggedInSuccess, AuthActions.updateTokenSuccess, AuthActions.loginSuccess),
            concatMap((action) =>
                this.keycloakService.loadUserProfile()
                    .then((user) => {
                        if (user) {
                            return AuthActions.loadUserProfileSuccess({ user });
                        } else {
                            let error = new Error("Load user profile failed");
                            return AuthActions.loadUserProfileFailed({ error });
                        }
                    })
                    .catch((error) => AuthActions.loadUserProfileFailed({ error }))
            ),
        ),
    );

}