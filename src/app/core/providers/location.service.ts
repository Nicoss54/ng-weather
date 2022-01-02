import { Injectable } from '@angular/core';
import { ProvidersModule } from './providers.module';

export const LOCATIONS : string = "locations";

@Injectable({
  providedIn: ProvidersModule
})
export class LocationService {
  locations : Array<{ zipCode: string, country: string}>

  constructor() {}

  getAllStorageLocations(): Array<{zipCode: string, country: string}> {
    this.locations = localStorage.getItem(LOCATIONS) ? JSON.parse(localStorage.getItem(LOCATIONS)) : []
    return this.locations;
  }

  addLocation(zipCode : string, country: string){
    this.locations.push({zipCode, country});
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
  }

  removeLocation(zipCode : string){
    let index = this.locations.findIndex(location => location.zipCode === zipCode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    }
  }
}
