import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'app/core/providers/weather.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit {
  forecast$: Observable<any>;

  constructor(private readonly weatherService: WeatherService, private readonly route : ActivatedRoute) { }

  ngOnInit(): void {
    this.forecast$ = this.route.paramMap.pipe(
      switchMap(params => of({zipCode: params.get('zipcode'), country: params.get('country')})),
      switchMap(params => this.weatherService.getForecast(params.zipCode, params.country)),
    )
  }
}
