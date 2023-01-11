import { Routes } from "@angular/router";

export const TRAINING_ROUTES: Routes = [
    {
      path: '',
      component: ProfileComponent,
      providers: [
        // provideState(profileFeature),
        // provideState(articleListFeature),
        // provideEffects(ProfileEffects, ArticleListEffects),
      ],
      resolve: { ProfileResolverService },
    },
  ];