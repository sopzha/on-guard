import { Component, OnInit} from '@angular/core';
import { MapDirectionsService, MapGeocoder } from '@angular/google-maps';
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

  latLowBound: number;
  latHighBound: number;
  lonLowBound: number;
  lonHighBound: number;

  incidentPositions: google.maps.LatLngLiteral[] = [];
  markerClustererImagePath =
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  directionsResults$?: Observable<google.maps.DirectionsResult|undefined>;
  
  constructor(private mapDirectionsService: MapDirectionsService,
              private incidentService: IncidentService,
              private geocoder: MapGeocoder) {
  }

  ngOnInit(): void {
  }

  addMarkers(): void {
    this.incidentService.getIncidents()
        .subscribe(incidents => {
          for (const incident of incidents.result.records) {
            if (incident.Lat &&
                parseFloat(incident.Lat) > this.latLowBound && parseFloat(incident.Lat) < this.latHighBound &&
                parseFloat(incident.Long) > this.lonLowBound && parseFloat(incident.Long) < this.lonHighBound) {
              this.incidentPositions.push({
                lat: parseFloat(incident.Lat),
                lng: parseFloat(incident.Long),
              })
            }
          }
        });
  }

  generateDirections(newDirectionsRequest: google.maps.DirectionsRequest) {
    this.incidentPositions = [];

    let originLat: number;
    let originLon: number;
    let destinationLat: number;
    let destinationLon: number;

    this.geocoder.geocode({
      address: newDirectionsRequest.origin.toString()
    }).subscribe(({results}) => {
      originLat = results[0].geometry.location.lat();
      originLon = results[0].geometry.location.lng();

      this.geocoder.geocode({
        address: newDirectionsRequest.destination.toString()
      }).subscribe(({results}) => {
        destinationLat = results[0].geometry.location.lat();
        destinationLon = results[0].geometry.location.lng();

        this.latHighBound = Math.max(originLat, destinationLat);
        this.latLowBound = Math.min(originLat, destinationLat);
        this.lonHighBound = Math.max(originLon, destinationLon);
        this.lonLowBound = Math.min(originLon, destinationLon);

        this.addMarkers();

      });

    });

    
    this.directionsResults$ = this.mapDirectionsService.route(newDirectionsRequest).pipe(
      map(response => response.result)
    );

  }
  
  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng.toJSON());
  }
}
