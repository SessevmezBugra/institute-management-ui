
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/containers/app/app.component';
import { API_URL } from './app/core/http-client/api-url.token';
import { environment } from './environments/environment';
import { authFeature } from './app/core/auth/+state/auth.reducer';
import { KeycloakAngularModule, KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { ngrxErrorFeature } from './app/core/ngrx-error/+state/ngrx-error.reducer';
import { errorHandlingInterceptor } from './app/core/ngrx-error/ngrx-error-interceptor.service';
import { NgrxErrorEffects } from './app/core/ngrx-error/+state/ngrx-error.effects';
import { AuthEffects } from './app/core/auth/+state/auth.effects';
import * as AuthActions from "./app/core/auth/+state/auth.actions";

if (environment.production) {
  enableProdMode();
}

function initializeKeycloak(keycloak: KeycloakService, store: Store) {
  return () =>
    keycloak.init({
      config: {
        url: `${environment.keycloak_url}`,
        realm: 'institute-management',
        clientId: 'ui-app'
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    }).then((isOk) => {
      if(isOk) {
        store.dispatch(AuthActions.initializeKeycloakSuccess());
      }else {
        store.dispatch(AuthActions.initializeKeycloakFailed({error: new Error('Keycloak initialize failed')}));
      }
    }).catch((error) => {
      store.dispatch(AuthActions.initializeKeycloakFailed({error}));
    });
}

function updateToken(keycloak: KeycloakService, store: Store) {
  return () => keycloak.keycloakEvents$.subscribe({
    next: (e) => {
      console.log("keycloak event: " + e.type);
      if (e.type == KeycloakEventType.OnTokenExpired) {
        store.dispatch(AuthActions.updateToken());
      }
    }
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ]),
    provideStore({
      auth : authFeature.reducer,
      ngrxError: ngrxErrorFeature.reducer
    }),
    provideEffects(NgrxErrorEffects, AuthEffects),
    provideHttpClient(withInterceptors([errorHandlingInterceptor])),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }),
      KeycloakAngularModule
    ),
    !environment.production ? provideStoreDevtools() : [],
    { provide: API_URL, useValue: environment.api_url },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, Store]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: updateToken,
      multi: true,
      deps: [KeycloakService, Store]
    },
  ],
}).catch((err) => console.log(err));