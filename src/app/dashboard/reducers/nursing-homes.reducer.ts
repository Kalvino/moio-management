import { NursingHomesApiActions, NursingHomesActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NursingHome } from '../models/nursing-home.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<NursingHome> {
  selectedNursingHomeId: number | null;
}

// extend & export entity adapter
export const adapter: EntityAdapter<NursingHome> = createEntityAdapter<NursingHome>({
  selectId: (nursingHome: NursingHome) => nursingHome.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapter.getInitialState({
  selectedNursingHomeId: null
});

/**
 * reducer for the nursingHomes state
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

    // load nursingHomes success state
    case NursingHomesApiActions.NursingHomesApiActionTypes.LoadNursingHomesSuccess:
      // console.log(action.payload.nursingHomes);
      return adapter.upsertMany(action.payload.nursingHomes, state);

    // add a new entity to the state in case creation is successful
    case NursingHomesApiActions.NursingHomesApiActionTypes.CreateNursingHomeSuccess:
      return adapter.addOne(action.payload.nursingHome, state);

    case NursingHomesApiActions.NursingHomesApiActionTypes.EditNursingHomeSuccess:
      return adapter.upsertOne(action.payload.nursingHome, state);

    // case select nursingHome
    case NursingHomesActions.NursingHomesActionTypes.SelectNursingHome:
      return {
        ...state,
        selectedNursingHomeId: action.payload.id
      };

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case NursingHomesActions.NursingHomesActionTypes.ResetNursingHomesState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected nursingHome id from the state
 * @param state
 */
export const getSelectedNursingHomeId = (state: State) => state.selectedNursingHomeId;
