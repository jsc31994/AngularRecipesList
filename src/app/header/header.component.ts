import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  private userSubscription: Subscription;
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe()
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        // if user data exists, then auth status equals true
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
