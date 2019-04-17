import { NursingHomesApiActions, NursingHomesActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AuthApiActions } from '../../auth/actions';
import { Geofencing } from '../models/nursing-home-geofencing.model';

// state interface definition
export interface State extends EntityState<Geofencing> {
  selectedGeogenceId: number | null;
}

// extend & export entity adapater
export const adapater: EntityAdapter<Geofencing> = createEntityAdapter<Geofencing>({
  selectId: (geofencing: Geofencing) => geofencing.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapater.getInitialState({
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

    // load nursinghome geofencing success state
    case NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomeGeofencingSuccess:
      return adapater.upsertMany(action.payload.geofencing, state);

    // add a new entity to the state in case creation is successful
    case NursingHomesApiActions.NursingHomesApiActionTypes.CreateNursingHomeGeofencingSuccess:
      return adapater.addOne(action.payload.geofencing, state);

    case NursingHomesApiActions.NursingHomesApiActionTypes.EditNursingHomeGeofencingSuccess:
      return adapater.upsertOne(action.payload.geofencing, state);

    // case select nursinghome geofencing
    case (NursingHomesActions.NursingHomesActionTypes.SelectNursingHomeGeofencing):
      return {
        ...state,
        selectedGeogenceId: action.payload.id
      };

    // clear selected nursinghome geofencing
    case (NursingHomesActions.NursingHomesActionTypes.DismissEditNursingHomeGeofencing):
      return {
        ...state,
        selectedGeogenceId: null
      }


    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case NursingHomesActions.NursingHomesActionTypes.ResetNursingHomeGeofencingState:
      return initialState;

    default:
      return state;
  }

}
