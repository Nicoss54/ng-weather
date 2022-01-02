import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastData } from 'app/shared/models/forecat.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProvidersModule } from './providers.module';



@Injectable({
  providedIn: ProvidersModule
})
export class WeatherService {

  static URL = environment.url;
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = [];

  constructor(private readonly http: HttpClient) { }
  
  addCurrentConditions(zipCode: string, country: string): Observable<ForecastData> {
    return  this.http.get<any>(`${WeatherService.URL}/weather?zip=${zipCode},${country}&units=imperial&APPID=${WeatherService.APPID}`).pipe(map(data => ({ zipCode, country, data: { ...data, imgWeatherSrc: this.getWeatherIcon(data.weather[0].id) } })));
  }

  removeCurrentConditions(zipcode: string) {
    for (let i in this.currentConditions){
      if (this.currentConditions[i].zip == zipcode)
        this.currentConditions.splice(+i, 1);
    }
  }

  getCurrentConditions(): any[] {
    return this.currentConditions;
  }

  getForecast(zipcode: string, country: string): Observable<any> {
    return this.http.get(`${WeatherService.URL}/forecast/daily?zip=${zipcode},${country}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);
  }

  private getWeatherIcon(id){
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
