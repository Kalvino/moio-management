/// <reference types="@types/googlemaps" />
import { Component, OnInit, Inject, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MapsAPILoader, AgmMap, LatLngLiteral } from '@agm/core';

/* NGRX */
import { Store } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
// import * as nursingHomeActions from '../../../actions/nursing-homes.actions';
import { TranslateService } from '@ngx-translate/core';
// import { NursingHomesActions } from '../../../actions';
import { Geofencing } from '../../../models/nursing-home-geofencing.model';
import { ConfirmService } from '../../../../core/services/confirm.service'

declare var google: any;

@Component({
  selector: 'geofence-form',
  templateUrl: './geofence-form.component.html',
  styleUrls: ['./geofence-form.component.scss']
})
export class GeofenceFormComponent implements OnInit {
  public itemForm: FormGroup;
  private validationMessages: { [key: string]: { [key: string]: string } };
  public lat: number;
  public lng: number;
  public zoom: number;
  public drawingManager: any;
  public polygons = [];
  public overlay;
  public coordinates;


  @ViewChild('map') map: AgmMap;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GeofenceFormComponent>,
    private fb: FormBuilder,
    private store: Store<fromDashboard.State>,
    private translate: TranslateService,
    public confirmService: ConfirmService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {

    this.validationMessages = {
      name: {
        required: 'Geofence name is required.'
      }
    }

  }

  ngOnInit() {

    this.buildItemForm()
    this.zoom = 18;
    this.lat = 39.8282;
    this.lng = -98.5795;
    this.overlay = null;
    this.coordinates = [];

    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;

        });
      });
    });

    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      },
      polygonOptions: {
        clickable: true,
        draggable: true,
        editable: true,
        fillColor: '#ffff00',
        fillOpacity: 0.5,
      },
    });


  }

  deletePolygon() {

    if (this.overlay) {
      this.overlay.setMap(null);
      this.overlay = null;
      this.coordinates = [];
      this.itemForm.controls['polygon'].setValue('');
    }
  }

  createPolygonArray(input) {
    let x = input.split(",");
    let co = { lat: x[0], lng: x[1] }
    this.coordinates.push(co);
    this.itemForm.controls['polygon'].setValue(JSON.stringify(this.coordinates));
  }

  ngAfterViewInit() {
    this.map.mapReady.subscribe(map => {
      this.drawingManager.setMap(map);
    });

    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {

      this.overlay = event.overlay;
      this.overlay.type = event.type;

      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        var len = event.overlay.getPath().getLength();
        for (var i = 0; i < len; i++) {
          this.createPolygonArray(event.overlay.getPath().getAt(i).toUrlValue(6));
        }
      }
    });
  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      polygon: ['', Validators.required],
      search: ['']
    })
  }

  submit() {

    if (this.itemForm.valid) {
      console.log(this.itemForm)
      const geofence = this.itemForm.value;
      console.log(geofence);
      console.log(this.coordinates);
      let x = JSON.stringify(this.coordinates);
      console.log(x)
      //this.store.dispatch(new UsersActions.CreateUser({ user }));
      //this.dialogRef.close(this.itemForm.value)
    }
  }


  cancel() {
    const title = this.translate.instant("CloseUnsavedForm.title");
    const message = this.translate.instant("CloseUnsavedForm.message");
    if (this.itemForm.dirty) {
      this.confirmService.confirm({ title: title, message: message }).subscribe(res => {
        if (res) {
          // this.store.dispatch(new UsersActions.DismissUserFormDialog());
          this.dialogRef.close(this.itemForm.value)
        }
      })
    } else {
      // this.store.dispatch(new UsersActions.DismissUserFormDialog());
      this.dialogRef.close(this.itemForm.value)
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
