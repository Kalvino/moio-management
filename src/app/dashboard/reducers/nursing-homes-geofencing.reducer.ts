import { NursingHomesApiActions, NursingHomesActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { Geofencing } from '../models/nursing-home-geofencing.model';

// state interface definition
export interface State extends EntityState<Geofencing> {
  selectedGeogenceId: number | null;
}

// extend & export entity adapater
export const adapter: EntityAdapter<Geofencing> = createEntityAdapter<Geofencing>({
  selectId: (geofencing: Geofencing) => geofencing.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedGeogenceId: null
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

    // load user patients success state
    case NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomeGeofencingSuccess:
      return adapter.upsertMany(action.payload.geofencing, state);

    // Add a new geofence
    case NursingHomesApiActions.NursingHomesApiActionTypes.CreateNursingHomeGeofencingSuccess:
      return adapter.addOne(action.payload.geofencing, state);

    // Edit a geofence
    case NursingHomesApiActions.NursingHomesApiActionTypes.EditNursingHomeGeofencingSuccess:
      return adapter.upsertOne(action.payload.geofencing, state);

    // delete a geofence
    case (NursingHomesApiActions.NursingHomesApiActionTypes.DeleteNursingHomeGeofencingSuccess):
      return adapter.removeOne(action.payload.geofencing.id, state)

    // clear selected nursinghome
    case (NursingHomesActions.NursingHomesActionTypes.DismissEditNursingHome):
      return adapter.removeAll(state)

    // clear nursinghome geofences
    case (NursingHomesActions.NursingHomesActionTypes.SelectNursingHome):
      return adapter.removeAll(state)

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case NursingHomesActions.NursingHomesActionTypes.ResetNursingHomesState:
      return initialState;

    default:
      return state;
  }

}
