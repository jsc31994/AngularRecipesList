import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    // we can group actions together like this
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        user: null,
        isLoading: true,
        authError: null
      }

    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        isLoading: false
      }
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      // whenever we call dispatch within our app,
      // it hooks into ALL reducers, so lets always return
      // the current state for all our reducers by default
      return state;
  }
}
