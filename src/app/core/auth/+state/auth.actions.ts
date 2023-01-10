import { createAction, props } from "@ngrx/store";

export const initializeKeycloakSuccess = createAction('[auth] INITIALIZE_KEYCLOAK_SUCCESS');

export const initializeKeycloakFailed = createAction('[auth] INITIALIZE_KEYCLOAK_FAILED', props<{error: Error}>());

export const login = createAction('[auth] LOGIN');

export const loginSuccess = createAction('[auth] LOGIN_SUCCESS');

export const loginFailed = createAction('[auth] LOGIN_FAILED', props<{error: Error}>());

export const updateToken = createAction('[auth] UPDATE_TOKEN');

export const updateTokenSuccess = createAction('[auth] UPDATE_TOKEN_SUCCESS');

export const updateTokenFailed = createAction('[auth] UPDATE_TOKEN_FAILED', props<{error: Error}>());

export const updateIsLoggedIn = createAction('[auth] UPDATE_IS_LOGGED_IN');

export const updateIsLoggedInSuccess = createAction('[auth] UPDATE_IS_LOGGED_IN_SUCCESS');

export const updateIsLoggedInFailed = createAction('[auth] UPDATE_IS_LOGGED_IN_FAILED', props<{error: Error}>());

export const loadUserProfile = createAction('[auth] LOAD_USER_PROFILE');

export const loadUserProfileSuccess = createAction('[auth] LOAD_USER_PROFILE_SUCCESS', props<{user: Keycloak.KeycloakProfile}>() );

export const loadUserProfileFailed = createAction('[auth] LOAD_USER_PROFILE_FAILED', props<{error: Error}>());

