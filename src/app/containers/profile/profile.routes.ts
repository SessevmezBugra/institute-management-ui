import { Routes } from "@angular/router";
import { InstituteListComponent } from "../institute-list/institute-list.component";
import { MeasureListComponent } from "../measure-list/measure-list.component";
import { TrainingListComponent } from "../training-list/training-list.component";
import { ProfileResolverService, ProfileTrainingListResolverService, ProfileMeasureListResolverService, ProfileInstituteListResolverService } from "./data-access";
import { ProfileComponent } from "./profile.component";

export const PROFILE_ROUTES: Routes = [
    {
      path: '',
      component: ProfileComponent,
      providers: [
        // provideState(profileFeature),
        // provideState(articleListFeature),
        // provideEffects(ProfileEffects, ArticleListEffects),
      ],
      resolve: { ProfileResolverService },
    //   canActivate: [AuthGuardService],
      children: [
        {
          path: 'training',
          component: TrainingListComponent,
          resolve: { ProfileTrainingListResolverService },
        },
        {
          path: 'measure',
          component: MeasureListComponent,
          resolve: { ProfileMeasureListResolverService },
        },
        {
          path: 'institute',
          component: InstituteListComponent,
          resolve: { ProfileInstituteListResolverService },
        },
      ],
    },
  ];