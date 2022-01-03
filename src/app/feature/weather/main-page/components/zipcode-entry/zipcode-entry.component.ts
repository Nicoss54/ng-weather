import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CountriesService } from 'app/core/providers/countries.service';
import { WeatherService } from 'app/core/providers/weather.service';
import { ForecastData } from 'app/shared/models/forecat.model';
import { fromEvent, iif, Observable, Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { ZipCodeForm } from './zipcode.form';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output('addNewLocation') addNewLocation$ = new EventEmitter<ForecastData>();
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  countries$: Observable<Array<{ name: string, code: string }>>;
  zipCodeForm: ZipCodeForm;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private readonly weatherService : WeatherService, private readonly countriesService: CountriesService) { }

  ngOnInit(): void {
    this.zipCodeForm = new ZipCodeForm();
  }

  ngAfterViewInit(): void {
    const allCountries$ = this.countriesService.getCountries().pipe(shareReplay(1));
    this.countries$ = fromEvent(this.searchInput.nativeElement, 'input').pipe(
      startWith(this.searchInput.nativeElement.value),
      switchMap(() => iif(() => ! !!this.searchInput.nativeElement.value, allCountries$, allCountries$.pipe(
        map((countries) => countries.filter(country => country.name.toLowerCase().includes(this.searchInput.nativeElement.value.toLowerCase())))))),
      )
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  addLocation(): Observable<any> {
    return this.weatherService.addCurrentConditions(this.zipCodeForm.value.zipCode, this.zipCodeForm.value.country).pipe(tap(forecastData => {
      this.addNewLocation$.emit(forecastData);
      this.zipCodeForm.reset();
    }));
  }
}
