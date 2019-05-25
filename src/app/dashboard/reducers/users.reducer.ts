import { UsersApiActions, UsersActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../models/user.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<User> {
  selectedUserId: number | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
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
      return adapter.upsertMany(action.payload.users, state);

    // add a new entity to the state in case creation is successful
    case UsersApiActions.UsersApiActionTypes.CreateUserSuccess:
      return adapter.addOne(action.payload.user, state);

    case UsersApiActions.UsersApiActionTypes.EditUserSuccess:
      return adapter.upsertOne(action.payload.user, state);

    // case select user
    case UsersActions.UsersActionTypes.SelectUser:
      return {
        ...state,
        selectedUserId: action.payload.id
      };

    // clear selected user
    case (UsersActions.UsersActionTypes.DismissEditUser):
      return {
        ...state,
        selectedUserId: null
      }

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
 * @param state the current state
 */
export const getSelectedUserId = (state: State) => state.selectedUserId;
