import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { KeycloakService } from "keycloak-angular";
import { AuthState } from "./auth.reducer";
import * as AuthActions from "./auth.actions";
import { authQuery } from "./auth.selectors";

@Injectable()
export class AuthFacade {

  isLoggedIn$ = this.store.select(authQuery.getIsLogin);
  userProfile$ = this.store.select(authQuery.getUserProfile);

  constructor(private store: Store<AuthState>) { }

  login() {
    this.store.dispatch(AuthActions.login());
  }

  updateToken() {
    this.store.dispatch(AuthActions.updateToken());
  }

  updateIsLoggedIn() {
    this.store.dispatch(AuthActions.updateIsLoggedIn());
  }

  keycloakInitializeSucceed() {
    this.store.dispatch(AuthActions.initializeKeycloakSuccess());
  }

  keycloakInitializeFailed(error: Error) {
    this.store.dispatch(AuthActions.initializeKeycloakFailed({error}));
  }
}