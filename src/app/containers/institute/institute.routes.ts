import { Routes } from "@angular/router";
import { UserListComponent } from "../user-list/user-list.component";
import { InstituteComponent } from "./institute.component";
import { InstituteResolverService, InstituteUserMeasureListResolverService, InstituteUserMeasureResolverService, InstituteUserTrainingListResolverService, InstituteUserTrainingResolverService} from "./data-access"
import { ProfileComponent } from "../profile/profile.component";
import { InstituteUserListResolverService, InstituteUserResolverService } from "./data-access"
import { TrainingListComponent } from "../training-list/training-list.component";
import { MeasureListComponent } from "../measure-list/measure-list.component";
import { TrainingComponent } from "../training/training.component";
import { MeasureComponent } from "../measure/measure.component";


export const INSTITUTE_ROUTES: Routes = [
    {
      path: ':instituteId',
      component: InstituteComponent,
      providers: [
        // provideState(profileFeature),
        // provideState(articleListFeature),
        // provideEffects(ProfileEffects, ArticleListEffects),
      ],
       resolve: { InstituteResolverService },
    //   canActivate: [AuthGuardService],
      children: [
        {
          path: 'user',
          component: UserListComponent,
          resolve: { InstituteUserListResolverService },
          children: [
            {
                path: ':userId',
                component: ProfileComponent,
                resolve: { InstituteUserResolverService },
                children: [
                    {
                        path: 'training',
                        component: TrainingListComponent,
                        resolve: { InstituteUserTrainingListResolverService },
                        children: [
                            {
                                path: ':trainingId',
                                component: TrainingComponent,
                                resolve: InstituteUserTrainingResolverService,
                            }
                        ]
                      },
                      {
                        path: 'measure',
                        component: MeasureListComponent,
                        resolve: { InstituteUserMeasureListResolverService },
                        children: [
                            {
                                path: ':measureId',
                                component: MeasureComponent,
                                resolve: InstituteUserMeasureResolverService,
                            }
                        ]
                      },
                ]
            }
          ]
        },
      ],
    },
  ];