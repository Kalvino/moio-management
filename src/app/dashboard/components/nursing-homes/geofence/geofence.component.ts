import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { LatLngLiteral, LatLngBounds, AgmMap } from '@agm/core';

declare var google: any;

@Component({
  selector: 'nursing-home-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.scss']
})
export class NursingHomeGeofence implements OnInit, AfterViewInit {
  lat: number = 49.4521;
  lng: number = 11.0767;
  zoom: number = 20;
  fillcolor = '#ffff00';
  fillopacity = 0.5;
  strokeweight = 1;
  paths: Array<LatLngLiteral> = [];
  @Input() input = '';

  @ViewChild('map') m: AgmMap;

  ngOnInit() {

    if (this.input.length > 0) {
      this.paths = JSON.parse(this.input);
    } else {
      console.log('no paths available');
    }

  }

  //Center the map to the polygon 
  ngAfterViewInit() {

    if (this.input.length > 0) {
      this.m.mapReady.subscribe(map => {
        const bounds: LatLngBounds = new google.maps.LatLngBounds();
        for (const mm of this.paths) {
          bounds.extend(new google.maps.LatLng(mm.lat, mm.lng));
        }
        map.fitBounds(bounds);
      });
    }

  }

}
