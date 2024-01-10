import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from './property.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  
 

  private baseUrl = 'http://localhost:8083/api/property';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    const url = this.baseUrl + '/getallproperty';
    return this.http.get<Property[]>(url);
  }

  createProperties(property: Property): Observable<any> {
    const url = this.baseUrl + '/saveproperty';
    return this.http.post(url, property);
  }

  updateProperty(propertyId:number,property: Property): Observable<Property> {
    const url = this.baseUrl + '/updateproperty/' + propertyId;
    return this.http.put<Property>(url, property);
  }

  deleteproperties(propertyId: number): Observable<void> {
    const url = this.baseUrl + '/deleteproperty/' + propertyId;
    return this.http.delete<void>(url);
  }
}
