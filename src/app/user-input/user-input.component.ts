import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  @Output() newDirectionsRequestEvent = new EventEmitter<google.maps.DirectionsRequest>();
  
  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(origin: string, destination: string, travelMode: string) {
    this.newDirectionsRequestEvent.emit({
      origin: origin,
      destination: destination,
      travelMode: travelMode === 'walking' ? google.maps.TravelMode.WALKING :
                  travelMode === 'driving' ? google.maps.TravelMode.DRIVING : 
                                             google.maps.TravelMode.BICYCLING
    });
  };
}
