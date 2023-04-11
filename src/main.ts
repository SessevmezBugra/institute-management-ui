
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideState, provideStore, Store } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from './app/containers/app/app.component';
import { API_URL } from './app/core/http-client/api-url.token';
import { environment } from './environments/environment';
import { authFeature } from './app/core/auth/+state/auth.reducer';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { ngrxErrorFeature } from './app/core/ngrx-error/+state/ngrx-error.reducer';
import { errorHandlingInterceptor } from './app/core/ngrx-error/ngrx-error-interceptor.service';
import { NgrxErrorEffects } from './app/core/ngrx-error/+state/ngrx-error.effects';
import { AuthEffects } from './app/core/auth/+state/auth.effects';
import * as AuthActions from "./app/core/auth/+state/auth.actions";
import { trainingListResolver } from './app/containers/training-list/data-access/service/training-list-resolver.service';
import { trainingResolver } from './app/containers/training/data-access/service/training-resolver.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthFacade } from './app/core/auth';
import { NgrxDialogFacade } from './app/core/ngrx-dialog/+state/ngrx-dialog.facade';
import { trainingListEffects, TrainingListFacade, trainingListFeature } from './app/containers/training-list';
import { ngrxFormsEffects, ngrxFormsFeature } from './app/core/ngrx-form';
import { MatDialogModule } from '@angular/material/dialog';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ngrxDialogFeature } from './app/core/ngrx-dialog/+state/ngrx-dialog.reducer';
import { trainingEffects, trainingFeature } from './app/containers/training';

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
      },
      enableBearerInterceptor: true
    }).then((isOk) => {
      if (isOk) {
        store.dispatch(AuthActions.initializeKeycloakSuccess());
      } else {
        store.dispatch(AuthActions.initializeKeycloakFailed({ error: new Error('Keycloak initialize failed') }));
      }
    }).catch((error) => {
      store.dispatch(AuthActions.initializeKeycloakFailed({ error }));
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
    AuthFacade,
    NgrxDialogFacade,
    provideRouter([
      // {
      //   path: '',
      //   redirectTo: 'main-training',
      //   pathMatch: 'full',
      // },
      {
        path: '',
        redirectTo: 'training',
        pathMatch: 'full',
      },
      // {
      //   path: 'main-training',
      //   loadComponent: () => import('./app/containers/training/training.component').then((t) => t.TrainingComponent),
      //   resolve: { mainTrainingResolver }
      // },
      {
        path: 'training',
        loadComponent: () => import('./app/containers/training-list/training-list.component').then((t) => t.TrainingListComponent),
        resolve: { trainingListResolver },
        providers: [provideState(trainingListFeature), provideEffects(trainingListEffects)],
      },
      {
        path: 'training/:trainingId',
        loadComponent: () => import('./app/containers/training/training.component').then((t) => t.TrainingComponent),
        resolve: { trainingResolver },
        providers: [provideState(trainingFeature), provideEffects(trainingEffects)],
      },

    ]),
    provideStore({
      auth: authFeature.reducer,
      ngrxError: ngrxErrorFeature.reducer,
      ngrxForms: ngrxFormsFeature.reducer,
      ngrxDialog: ngrxDialogFeature.reducer
    }),
    provideEffects(NgrxErrorEffects, AuthEffects, ngrxFormsEffects),
    provideHttpClient(
      withInterceptors([errorHandlingInterceptor]), 
      withInterceptorsFromDi()
    ),
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      }),
      KeycloakAngularModule, 
      BrowserAnimationsModule,
      MatDialogModule,
      LoggerModule.forRoot({
        level: environment.production ? NgxLoggerLevel.ERROR : NgxLoggerLevel.TRACE,
      }),
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