import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from "@angular/router";
import { ForecastData } from 'app/shared/models/forecat.model';


@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionsComponent {
  @Input() weatherLocationConditions: Array<ForecastData>;
  @Output('removeLocation') removeLocation$: EventEmitter<string> = new EventEmitter();

  constructor(private readonly router : Router) {
  }

  showForecast(zipCode : string){
    this.router.navigate(['/forecast', zipCode])
  }

  removeLocation(zipCode: string): void {
    this.removeLocation$.emit(zipCode);
  }
}
