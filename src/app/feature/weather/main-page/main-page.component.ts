import { Component, OnInit } from '@angular/core';
import { LocationService } from 'app/core/providers/location.service';
import { WeatherService } from 'app/core/providers/weather.service';
import { ForecastData } from 'app/shared/models/forecat.model';
import { forkJoin, iif, interval, Observable, of } from 'rxjs';
import { first, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {

  locationWeatherConditions$: Observable<Array<ForecastData>>

  constructor (private readonly locationService: LocationService, private readonly weatherService: WeatherService) {}
  
  ngOnInit(): void {
    this.locationWeatherConditions$ = interval(30000).pipe(
      startWith(this.locationService.getAllStorageLocations()),
      map(() => this.locationService.getAllStorageLocations().map(({zipCode, country}) => this.weatherService.addCurrentConditions(zipCode, country))),
        switchMap((allCurentConditions: Array<Observable<ForecastData>>) => iif(() => allCurentConditions?.length === 0,of([]), forkJoin(allCurentConditions))), shareReplay(1) )
  }

  addNewLocation(forecastData: ForecastData): void { 
    this.locationWeatherConditions$ = this.locationWeatherConditions$.pipe(
      first(),
      tap((_) => this.locationService.addLocation(forecastData.zipCode, forecastData.country)),
      map(weatherLocationConditions => [...weatherLocationConditions, forecastData]),
      shareReplay(1))
  }

  removeLocation(zipCode: string): void {
    this.locationWeatherConditions$ = this.locationWeatherConditions$.pipe(
      first(),
      tap((_) => this.locationService.removeLocation(zipCode)),
      map(weatherLocationConditions => weatherLocationConditions.filter(condition => condition.zipCode !== zipCode)),
      shareReplay(1))
  }
}
