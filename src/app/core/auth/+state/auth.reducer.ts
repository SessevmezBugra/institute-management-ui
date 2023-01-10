import { createFeature, createReducer, on } from "@ngrx/store";
import * as Keycloak from "keycloak-js";
import * as AuthActions from "./auth.actions";

export const authFeatureKey = "auth";

export interface AuthState {
    isLoggedIn: boolean;
    user: Keycloak.KeycloakProfile
}

export const authInitialState: AuthState = {
    isLoggedIn: false,
    user: {
        id: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        enabled: false,
        emailVerified: false,
        totp: false,
        createdTimestamp: 0
    }
}

export const authFeature =

    createFeature({
        name: authFeatureKey,
        reducer: createReducer(
            authInitialState,
            on(AuthActions.loginSuccess, (state, action) => ({
                ...state,
                isLoggedIn: true
            })),
            on(AuthActions.loginFailed, (state, action) => ({
                ...state,
                isLoggedIn: false
            })),
            on(AuthActions.updateTokenSuccess, (state, action) => ({
                ...state,
                isLoggedIn: true
            })),
            on(AuthActions.updateTokenFailed, (state, action) => ({
                ...state,
                isLoggedIn: false
            })),
            on(AuthActions.updateIsLoggedInSuccess, (state, action) => ({
                ...state,
                isLoggedIn: true
            })),
            on(AuthActions.updateIsLoggedInFailed, (state, action) => ({
                ...state,
                isLoggedIn: false
            })),
            on(AuthActions.loadUserProfileSuccess, (state, action) => ({
                ...state,
                user: action.user
            })),
        )
    });
