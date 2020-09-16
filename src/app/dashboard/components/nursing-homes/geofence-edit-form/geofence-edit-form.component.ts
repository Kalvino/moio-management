/// <reference types="@types/googlemaps" />
import { Component, OnInit, Inject, NgZone, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MapsAPILoader, AgmMap, GoogleMapsAPIWrapper, LatLngLiteral, LatLngBounds } from '@agm/core';

/* NGRX */
import { Store } from '@ngrx/store';
import * as fromDashboard from '../../../reducers';
import { TranslateService } from '@ngx-translate/core';
import { NursingHomesActions } from '../../../actions';
import { ConfirmService } from '../../../../core/services/confirm.service';
import { MapIntersections } from '../../../shared/gmap-intersection';
import { NotifyService } from '../../../../core/services/notify.service';

declare var google: any;

@Component({
  selector: 'geofence-edit-form',
  templateUrl: './geofence-edit-form.component.html',
  styleUrls: ['./geofence-edit-form.component.scss']
})
export class GeofenceEditFormComponent implements OnInit {
  public itemForm: FormGroup;
  private validationMessages: { [key: string]: { [key: string]: string } };
  public lat: number;
  public lng: number;
  public zoom: number;
  public drawingManager: any;
  public polygons = [];
  public overlay;
  public coordinates;
  public map;
  public paths: Array<LatLngLiteral> = [];

  @ViewChild('map') m: AgmMap;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GeofenceEditFormComponent>,
    private fb: FormBuilder,
    private store: Store<fromDashboard.State>,
    private translate: TranslateService,
    public confirmService: ConfirmService,
    public intersect: MapIntersections,
    public notifyService: NotifyService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public mapApiWrapper: GoogleMapsAPIWrapper,
  ) {

    translate.setDefaultLang('de');

    this.validationMessages = {
      name: {
        required: 'Geofence name is required.'
      }
    }

  }

  ngOnInit() {

    const path = JSON.parse(this.data.geofence.polygon);

    let arr = [];

    for (const co of path) {
      let x = { lat: parseFloat(co.lat), lng: parseFloat(co.lng) }
      arr.push(x);
    }

    this.paths = arr;

    this.buildItemForm();
    this.zoom = 18;
    this.lat = 49.4521;
    this.lng = 11.0767;
    this.overlay = null;
    this.coordinates = this.paths;

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
          this.zoom = 18;

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

    }); // End of this.mapsAPILoader.load().then(() => {

  }//End of init


  deleteGeofence() {

    if (this.overlay) {
      this.overlay.setMap(null);
      this.overlay = null;
      this.coordinates = [];
      this.itemForm.controls['polygon'].setValue('');

      this.drawingManager.setOptions({
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [google.maps.drawing.OverlayType.POLYGON]
        }
      });

    }
  }

  maxPointsNotify() {
    const title = this.translate.instant("MaxPolygonPoints.title");
    const message = this.translate.instant("MaxPolygonPoints.message");
    this.notifyService.notify({ title, message });
  }

  minPointsNotify() {
    const title = this.translate.instant("MinPolygonPoints.title");
    const message = this.translate.instant("MinPolygonPoints.message");
    this.notifyService.notify({ title, message });
  }

  intersectionNotify() {
    const title = this.translate.instant("PolygonIntersection.title");
    const message = this.translate.instant("PolygonIntersection.message");
    this.notifyService.notify({ title, message });
  }

  createPolygonArray(input) {
    let x = input.split(",");
    let co = { lat: x[0], lng: x[1] }
    this.coordinates.push(co);
    this.itemForm.controls['polygon'].setValue(JSON.stringify(this.coordinates));
  }

  ngAfterViewInit() {

    this.mapsAPILoader.load().then(() => {

      this.m.mapReady.subscribe(map => {
        this.drawingManager.setMap(map);
        this.map = map;
      });

      google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {

        if (polygon.getPath().length > 16) {
          this.maxPointsNotify();
          this.deleteGeofence(); // Remove the current polygon
        } else if (polygon.getPath().length < 4) {
          this.minPointsNotify();
          this.deleteGeofence(); // Remove the current polygon
        } else {

          this.drawingManager.setOptions({
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: []
            }
          });

          this.intersect = new MapIntersections();
          const status = this.intersect.checkIntersection(polygon);

          //The map intersects
          if (status) {
            this.intersectionNotify();
            this.deleteGeofence(); // Remove the current polygon
          }

        }

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

      const polygon = new google.maps.Polygon({
        paths: this.paths,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ffff00',
        fillOpacity: 0.5
      });

      if (this.paths.length > 0) {
        this.m.mapReady.subscribe(map => {
          const bounds: LatLngBounds = new google.maps.LatLngBounds();
          for (const mm of this.paths) {
            bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
          }

          map.fitBounds(bounds);

          polygon.setMap(map);
          this.overlay = polygon;
        });
      }

    }); //End of this.mapsAPILoader.load().then(() => {

  }

  buildItemForm() {
    let { id, name, polygon, nursing_home_id } = this.data.geofence;
    this.itemForm = this.fb.group({
      id: [id, Validators.required],
      name: [name, Validators.required],
      polygon: [polygon, Validators.required],
      nursing_home_id: [nursing_home_id, Validators.required],
      search: ['']
    })
  }

  submit() {

    if (this.itemForm.valid) {

      const geofencing = this.itemForm.value;
      this.store.dispatch(new NursingHomesActions.EditNursingHomeGeofencing(geofencing));
      this.dialogRef.close(this.itemForm.value)
    }
  }


  cancel() {
    const title = this.translate.instant("CloseUnsavedForm.title");
    const message = this.translate.instant("CloseUnsavedForm.message");
    if (this.itemForm.dirty) {
      this.confirmService.confirm({ title: title, message: message }).subscribe(res => {
        if (res) {
          this.store.dispatch(new NursingHomesActions.DismissEditNursingHomeGeofencing());
          this.dialogRef.close(this.itemForm.value)
        }
      })
    } else {
      this.store.dispatch(new NursingHomesActions.DismissEditNursingHomeGeofencing());
      this.dialogRef.close(this.itemForm.value)
    }
  }

}
