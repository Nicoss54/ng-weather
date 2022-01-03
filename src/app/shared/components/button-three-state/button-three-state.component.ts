import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BUTTON_STATE } from 'app/shared/models/button-state.model';
import { interval, Observable, throwError } from 'rxjs';
import { catchError, first, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-button-three-state',
  templateUrl: './button-three-state.component.html',
  styleUrls: ['./button-three-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ButtonThreeStateComponent implements OnInit {
  currentState: BUTTON_STATE;
  @Input('clickAction') clickAction$: () => Observable<any>;
  @Input() reInitiallyDelay: number = 2000;
  @Input() disabled: boolean;
  
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.currentState = BUTTON_STATE.INITIAL;
  }

  onClick() {
    this.currentState = BUTTON_STATE.LOADING;

    this.clickAction$().pipe(
      tap(() => this.currentState = BUTTON_STATE.DONE),
            catchError((error) => {
              this.currentState = BUTTON_STATE.INITIAL
              return throwError(error)
            }),
      switchMap(() => interval(this.reInitiallyDelay).pipe(first()))).subscribe(() => {
        this.currentState = BUTTON_STATE.INITIAL;
        this.changeDetectorRef.markForCheck()
      });
  }
}