import { UsersApiActions, UsersActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { IPatient } from '../models/patient.model';

// state interface definition
export interface State extends EntityState<IPatient> {
}

// extend & export entity adapter
export const adapter: EntityAdapter<IPatient> = createEntityAdapter<IPatient>({
  selectId: (patient: IPatient) => patient.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
});

/**
 * reducer for the user patients state
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

    // load user patients success state
    case UsersApiActions.UsersApiActionTypes.LoadUserPatientsSuccess:
      return adapter.upsertMany(action.payload.patients, state);

    // clear selected user
    case (UsersActions.UsersActionTypes.DismissEditUser):
      return adapter.removeAll(state)

    // clear user patients
    case (UsersActions.UsersActionTypes.SelectUser):
      return adapter.removeAll(state)

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case UsersActions.UsersActionTypes.ResetUsersState:
      return initialState;

    default:
      return state;
  }

}
