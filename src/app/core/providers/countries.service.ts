import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProvidersModule } from './providers.module';

@Injectable({providedIn: ProvidersModule})
export class CountriesService {
  constructor(private readonly httpClient: HttpClient) {}

  getCountries(): Observable<Array<{ name: string, code: string }>> {
    return this.httpClient.get<Array<{Name: string, Code: string}>>('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json').pipe(
      map(countries => countries.map(({ Name, Code}) => ({name: Name, code: Code.toLowerCase()})))
    )
  }
}