import { PatientsApiActions, PatientsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { User } from '../models/user.model';

// state interface definition
export interface State extends EntityState<User> {
}

// extend & export entity adapter
export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
});

/**
 * reducer for the patient users state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | PatientsApiActions.PatientsApiActionsUnion
    | PatientsActions.PatientsActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load patient users success state
    case PatientsApiActions.PatientsApiActionTypes.LoadPatientUsersSuccess:
      return adapter.upsertMany(action.payload.users, state);

    // clear selected patient
    case (PatientsActions.PatientsActionTypes.DismissEditPatient):
      return adapter.removeAll(state)

    // clear patient users
    case (PatientsActions.PatientsActionTypes.SelectPatient):
      return adapter.removeAll(state)

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case PatientsActions.PatientsActionTypes.ResetPatientsState:
      return initialState;

    default:
      return state;
  }

}
