import { createEntityAdapter, EntityAdapter, EntityState, Dictionary } from '@ngrx/entity';
import { User } from '../models/user.model';
import { UsersActions, UsersActionTypes} from '../actions/users.actions';

export interface UsersState extends EntityState<User> {
  allUsersLoaded: boolean;
}

export const adapter: EntityAdapter<User> =
  createEntityAdapter<User>();


export const initialUsersState: UsersState = adapter.getInitialState({
  allUsersLoaded: false
});


export function usersReducer(state = initialUsersState, action: UsersActions): UsersState {

  switch (action.type) {

    case UsersActionTypes.LoadUsersSuccess:

      return adapter.addAll(action.payload, { ...state, allUsersLoaded: true });

    default: {

      return state;
    }

  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal

} = adapter.getSelectors();








