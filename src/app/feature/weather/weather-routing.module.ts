import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { MainPageComponent } from './main-page/main-page.component';

const WEATHER_ROUTE: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: ':zipcode/:country', component: ForecastsListComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(WEATHER_ROUTE)],
  exports: [RouterModule],
})
export class WeatherRoutingModule { }

