import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipesEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-8fd99-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return new RecipesActions.SetRecipes(recipes);
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        // get data from other observable, we can easily grab store data this way
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_actionData, recipesState]) => {
          return this.http.put(
            'https://ng-course-recipe-book-8fd99-default-rtdb.firebaseio.com/recipes.json',
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
