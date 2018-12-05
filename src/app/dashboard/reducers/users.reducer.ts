import { UsersApiActions, UsersActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../models/user.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<User> {
  selectedUserId: number | null;
}

// extend & export entity adapater
export const adapater: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapater.getInitialState({
  selectedUserId: null
});

/**
 * reducer for the users state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | UsersApiActions.UsersApiActionsUnion
    | UsersActions.UsersActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load users success state
    case UsersApiActions.UsersApiActionTypes.LoadUsersSuccess:
      console.log(action.payload.users);
      return adapater.upsertMany(action.payload.users, state);

    // add a new entity to the state in case creation is successful
    case UsersApiActions.UsersApiActionTypes.CreateUserSuccess:
      return adapater.addOne(action.payload.user, state);

    case UsersApiActions.UsersApiActionTypes.EditUserSuccess:
      return adapater.upsertOne(action.payload.user, state);

    // case select user
    case UsersActions.UsersActionTypes.SelectUser:
      return {
        ...state,
        selectedUserId: action.payload.id
      };

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case UsersActions.UsersActionTypes.ResetUsersState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected user id from the state
 * @param state
 */
export const getSelectedUserId = (state: State) => state.selectedUserId;
