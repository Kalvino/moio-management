import { createEntityAdapter, EntityAdapter, EntityState, Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
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

      return adapter.upsertMany(action.payload, { ...state, allUsersLoaded: true });

    case UsersActionTypes.LoadUsersFail:

      return { ...state, allUsersLoaded: false };

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

export const selectUsersState = createFeatureSelector<UsersState>('dashboard');

export const selectUserById = (userId: number) => createSelector(
  selectUsersState,
  usersState => usersState.entities[userId]
);

export const selectAllUsers = createSelector(
  selectUsersState,
  selectAll
);

export const allUsersLoaded = createSelector(
  selectUsersState,
  usersState => usersState.allUsersLoaded
);






