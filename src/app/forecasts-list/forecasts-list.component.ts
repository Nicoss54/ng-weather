import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'app/core/providers/weather.service';


@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit {
  zipcode: string;
  forecast: any;

  constructor(private readonly weatherService: WeatherService, private readonly route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      this.weatherService.getForecast(this.zipcode)
        .subscribe(data => this.forecast = data);
    });
  }
}
