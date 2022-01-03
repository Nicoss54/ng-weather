import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { WeatherService } from 'app/core/providers/weather.service';
import { ForecastData } from 'app/shared/models/forecat.model';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ZipCodeForm } from './zipcode.form';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output('addNewLocation') addNewLocation$ = new EventEmitter<ForecastData>();
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  zipCodeForm: ZipCodeForm;
  countries: Array<{ name: string; code: string }>;
  filteredCountries: Array<{ name: string; code: string }>;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private readonly weatherService : WeatherService) { }

  ngOnInit(): void {
    this.countries = [{ name: 'USA', code: 'us'}, { name: 'France', code: 'fr' }, { name: 'Australia', code: 'au'}];
    this.filteredCountries = [...this.countries];
    this.zipCodeForm = new ZipCodeForm();
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input').pipe(takeUntil(this.unsubscribe$)).subscribe(value => {
      this.filteredCountries = this.countries.filter(country => country.name.toLowerCase().includes(this.searchInput.nativeElement.value.toLowerCase()));
    })
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
