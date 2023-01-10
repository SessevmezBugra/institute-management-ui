import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.reducer";

const getAuth = createFeatureSelector<AuthState>(authFeatureKey);
export const getIsLogin = createSelector(getAuth, (state: AuthState) => state.isLoggedIn);
export const getUserProfile = createSelector(getAuth, (state: AuthState) => state.user);

export const authQuery = {
    getIsLogin,
    getUserProfile
}