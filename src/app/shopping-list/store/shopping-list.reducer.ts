import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      // do some logic
      console.log('added');
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      console.log('updated');
      const ingredient = state.ingredients[state.editedIngredientIndex];

      // here, we override the ingredient's fields with the updated fields
      const updatedIngredient = {
        // here are all the old properties that don't need to be updated (id for example)
        ...ingredient,
        // and these are the newly updated properties (name, or amount)
        ...action.payload,
      };

      // clone old array, and ready it for updating
      const updatedIngredients = [...state.ingredients];
      // update the index of the specified item, with the updated ingredient
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      console.log('deleted');
      return {
        ...state,
        // filter will return us a new array, so we get a copy
        ingredients: state.ingredients.filter((ingredient, index) => {
          // payload here is already a number
          return index !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        // we use spread operator here to not pass the direct reference
        editedIngredient: {...state.ingredients[action.payload]}
      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        // here just reset the edited piece of state
        editedIngredientIndex: -1,
        editedIngredient: null
      }
    default:
      return state;
  }
}
