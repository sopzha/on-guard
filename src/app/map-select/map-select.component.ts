import { Component, OnInit, Input } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';

import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css']
})
export class MapSelectComponent implements OnInit {

  center: google.maps.LatLngLiteral = {lat: 42.3600825, lng: -71.0588801};
  zoom = 10;

  @Input() origin: string;
  @Input() destination: string;
  @Input() travelMode: google.maps.TravelMode;

  incidentPositions: google.maps.LatLngLiteral[] = [];
  markerClustererImagePath =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  directionsResults$?: Observable<google.maps.DirectionsResult|undefined>;
  
  constructor(private mapDirectionsService: MapDirectionsService,
              private incidentService: IncidentService) {
  }

  ngOnInit(): void {
  }

  generateDirections(newDirectionsRequest: google.maps.DirectionsRequest) {
    this.directionsResults$ = this.mapDirectionsService.route(newDirectionsRequest).pipe(
      map(response => response.result)
    );
  }
  
  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }
}
