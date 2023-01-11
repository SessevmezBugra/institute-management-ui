import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class InstituteUserMeasureResolverService implements Resolve<void> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): void {
    // const username = route.params['username'];
    // this.store.dispatch(profileActions.loadProfile({ id: username }));
  }
}

