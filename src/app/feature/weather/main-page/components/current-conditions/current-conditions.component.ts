import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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

  constructor(private readonly router : Router, private readonly route: ActivatedRoute) {
  }

  showForecast(zipCode : string, country: string){
    this.router.navigate([zipCode, country], {relativeTo: this.route});
  }

  removeLocation(zipCode: string): void {
    this.removeLocation$.emit(zipCode);
  }
}
