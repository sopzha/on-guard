import { Component, OnInit } from '@angular/core';

import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-map-full',
  templateUrl: './map-full.component.html',
  styleUrls: ['./map-full.component.css']
})
export class MapFullComponent implements OnInit {
  center: google.maps.LatLngLiteral = {lat: 42.3600825, lng: -71.0588801};
  zoom = 10;

  incidentPositions: google.maps.LatLngLiteral[] = [];
  markerClustererImagePath =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  constructor(private incidentService: IncidentService) {
  }

  ngOnInit(): void {
    this.addMarkers();
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }

  addMarkers(): void {
    this.incidentService.getIncidents()
        .subscribe(incidents => {
          for (const incident of incidents.result.records) {
            if (incident.Lat) {
              this.incidentPositions.push({
                lat: parseFloat(incident.Lat),
                lng: parseFloat(incident.Long),
              })
            }
          }
        });
  }
}