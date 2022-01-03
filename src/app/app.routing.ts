import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'forecasts'},
  {
    path: 'forecasts', loadChildren: async () => (await import ('./feature/weather/weather.module')).WeatherModule
  },
];
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

