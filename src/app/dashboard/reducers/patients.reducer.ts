import { PatientsApiActions, PatientsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IPatient } from '../models/patient.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<IPatient> {
  selectedPatientId: number | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<IPatient> = createEntityAdapter<IPatient>({
  selectId: (patient: IPatient) => patient.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedPatientId: null
});

/**
 * reducer for the patients state
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

    // load patients success state
    case PatientsApiActions.PatientsApiActionTypes.LoadPatientsSuccess:
      return adapter.upsertMany(action.payload.patients, state);

    // add a new entity to the state in case creation is successful
    case PatientsApiActions.PatientsApiActionTypes.CreatePatientSuccess:
      return adapter.addOne(action.payload.patient, state);

    case PatientsApiActions.PatientsApiActionTypes.EditPatientSuccess:
      return adapter.upsertOne(action.payload.patient, state);

    // case select patient
    case PatientsActions.PatientsActionTypes.SelectPatient:
      return {
        ...state,
        selectedPatientId: action.payload.id
      };

    // clear selected patient
    case (PatientsActions.PatientsActionTypes.DismissEditPatient):
      return {
        ...state,
        selectedPatientId: null
      }

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case PatientsActions.PatientsActionTypes.ResetPatientsState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected patient id from the state
 * @param state
 * @param state the current state
 */
export const getSelectedPatientId = (state: State) => state.selectedPatientId;
