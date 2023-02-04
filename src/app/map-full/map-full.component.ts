import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-full',
  templateUrl: './map-full.component.html',
  styleUrls: ['./map-full.component.css']
})
export class MapFullComponent implements OnInit {
  center: google.maps.LatLngLiteral = {lat: 42.3600825, lng: -71.0588801};
  zoom = 10;

  constructor() {
  }

  ngOnInit(): void {
    this.addMarkers();
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  addMarkers() {

  }

}
