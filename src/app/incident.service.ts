import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private incidentsUrl = 'https://data.boston.gov/api/3/action/datastore_search?resource_id=b973d8cb-eeb2-4e7e-99da-c92938efc9c0&limit=500'

  constructor(private http: HttpClient) { }

  handleError() {
    
  }

  getIncidents(): Observable<any> {
    return this.http.get<any>(this.incidentsUrl)
      .pipe(
        tap(_ => console.log('fetched incidents'))
      );
  }

}
