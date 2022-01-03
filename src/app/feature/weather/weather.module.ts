import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { CurrentConditionsComponent } from './main-page/components/current-conditions/current-conditions.component';
import { ZipcodeEntryComponent } from './main-page/components/zipcode-entry/zipcode-entry.component';
import { MainPageComponent } from './main-page/main-page.component';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  imports: [WeatherRoutingModule, SharedModule],
  exports: [],
  declarations: [
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent],
  providers: [],
})
export class WeatherModule { }
