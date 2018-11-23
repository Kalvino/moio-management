import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

import * as fromUser from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>('users');


export const selectUserById = (userId: number) => createSelector(
  selectUsersState,
  usersState => usersState.entities[userId]
);


export const selectAllUsers = createSelector(
  selectUsersState,
  fromUser.selectAll

);


export const allUsersLoaded = createSelector(
  selectUsersState,
  usersState => usersState.allUsersLoaded
);








