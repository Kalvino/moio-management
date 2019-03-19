import { NursingHomesApiActions, NursingHomesActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { Geofencing } from '../models/nursing-home-geofencing.model';

// state interface definition
export interface State extends EntityState<Geofencing> {
}

// extend & export entity adapater
export const adapater: EntityAdapter<Geofencing> = createEntityAdapter<Geofencing>({
  selectId: (geofencing: Geofencing) => geofencing.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapater.getInitialState({
});

/**
 * reducer for the nursinghome geofencing state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | NursingHomesApiActions.NursingHomesApiActionsUnion
    | NursingHomesActions.NursingHomesActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load nursinghome geofencing success state
    case NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomesGeofencingSuccess:
      return adapater.upsertMany(action.payload.geofencing, state);

    // clear selected nursinghome
    case (NursingHomesActions.NursingHomesActionTypes.DismissEditNursingHome):
      return adapater.removeAll(state)

    // clear nursinghome geofencing
    case (NursingHomesActions.NursingHomesActionTypes.SelectNursingHome):
      return adapater.removeAll(state)

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case NursingHomesActions.NursingHomesActionTypes.ResetNursingHomesState:
      return initialState;

    default:
      return state;
  }

}
