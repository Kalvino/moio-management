import { ReportsApiActions, ReportsActions } from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Report } from '../models/report.model';
import { AuthApiActions } from '../../auth/actions';

// state interface definition
export interface State extends EntityState<Report> {
  selectedReportId: number | null;
}

// extend & export entity adapater
export const adapater: EntityAdapter<Report> = createEntityAdapter<Report>({
  selectId: (report: Report) => report.id,
  sortComparer: false
});

// compose the initial state
export const initialState: State = adapater.getInitialState({
  selectedReportId: null
});

/**
 * reducer for the reports state
 * @param state
 * @param action
 */
export function reducer(
  state: State = initialState,
  action:
    | ReportsApiActions.ReportsApiActionsUnion
    | ReportsActions.ReportsActionsUnion
    | AuthApiActions.AuthApiActionsUnion
): State {

  switch (action.type) {

    // load reports success state
    case ReportsApiActions.ReportsApiActionTypes.LoadReportsSuccess:
      return adapater.upsertMany(action.payload.reports, state);

    // add a new entity to the state in case creation is successful
    case ReportsApiActions.ReportsApiActionTypes.CreateReportSuccess:
      return adapater.addOne(action.payload.report, state);

    case ReportsApiActions.ReportsApiActionTypes.EditReportSuccess:
      return adapater.upsertOne(action.payload.report, state);

    // case select report
    case ReportsActions.ReportsActionTypes.SelectReport:
      return {
        ...state,
        selectedReportId: action.payload.id
      };

    // clear selected report
    case (ReportsActions.ReportsActionTypes.DismissEditReport):
      return {
        ...state,
        selectedReportId: null
      }

    // reset state to initial state on logout
    case AuthApiActions.AuthApiActionTypes.LogoutSuccess:
    case ReportsActions.ReportsActionTypes.ResetReportsState:
      return initialState;

    default:
      return state;
  }

}

/**
 * return the selected report id from the state
 * @param state
 * @param state the current state
 */
export const getSelectedReportId = (state: State) => state.selectedReportId;
