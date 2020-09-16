import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { NursingHome } from '../../../models/nursing-home.model';

/* NGRX */
import { Store, select } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import * as nursingHomesActions from '../../../actions/nursing-homes.actions';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'moio-nursing-home-list',
  templateUrl: './nursing-home-list.component.html',
  styleUrls: ['./nursing-home-list.component.scss']
})
export class NursingHomeListComponent implements OnInit, OnDestroy {

  // Used to select nursing-home in the list
  selectedNursingHome: NursingHome | null;
  componentActive = true;

  ids: string[];

  // all nursingHomes
  nursingHomes$: Observable<NursingHome[]> = this.store.pipe(
    select(fromDashboard.getAllNursingHomes)
  );

  // pending action
  isPending$: Observable<boolean> = this.store.pipe(
    select(fromDashboard.getNursingHomePagePending)
  );

  // get error status
  errorMessage$: Observable<string> = this.store.pipe(
    select(fromDashboard.getNursingHomePageError)
  );

  /**
   * constructor
   * @param store Store
   * @param translate TranslateService
   */
  constructor(
    private store: Store<fromDashboard.State>,
    private translate: TranslateService,
    private dialog: MatDialog,
    private snack: MatSnackBar) {

    this.translate.setDefaultLang('de');

  }

  public items: NursingHome[];
  nursingHomes: Observable<NursingHome[]>;

  /**
   * init NursingHomeListComponent component
   */
  ngOnInit(): void {

    this.store.dispatch(new nursingHomesActions.LoadNursingHomes());

    this.nursingHomes = this.store.pipe(select(fromDashboard.getAllNursingHomes)) as Observable<NursingHome[]>;

    this.store.pipe(select(fromDashboard.getNursingHomesIds))
      .subscribe((ids: string[]) => this.ids = ids);

    // Subscribe here because it does not use an async pipe
    this.store.pipe(
      select(fromDashboard.getSelectedNursingHome),
      takeWhile(() => this.componentActive)
    ).subscribe(
      currentNursingHome => this.selectedNursingHome = currentNursingHome
    );
  }

  // unsubscribe from the observable
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Create NursingHome  action
  newNursingHome(): void {
    this.store.dispatch(new nursingHomesActions.InitializeNursingHome());
  }

  // Select nursing-home action
  selectNursingHome(nursinghome: NursingHome): void {
    this.store.dispatch(new nursingHomesActions.SelectNursingHome(nursinghome));
  }

  /**
   * emit the selected nursing-home
   * the datatable component returns an ARRAY of selected
   * elements depending on the 'selectionType' setting.
   * In our case just a single nursing-home!
   * Therefor emit 0th element of the selection.
   *
   * @param selected NursingHome first element of array
   */
  onSelectRow({ selected }) {
    const nursinghome = selected[0];
    this.store.dispatch(new nursingHomesActions.SelectNursingHome(nursinghome));
    this.store.dispatch(new nursingHomesActions.LoadNursingHomeGeofencing(nursinghome.id));

  }


}
