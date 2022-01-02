import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, OnDestroy, Output, QueryList, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TypeHeadOptionDirective } from './typehead-option.directive';

@Component({
  selector: 'app-typehead',
  templateUrl: './typehead.component.html',
  styleUrls: ['./typehead.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TypeHeadComponent), multi: true }]
})

export class TypeHeadComponent implements AfterViewInit, ControlValueAccessor, OnDestroy{
  @Output('onSearch') onSearch$ = new EventEmitter<string>();
  @ContentChild('searchInput') searchInput: ElementRef<HTMLInputElement>; 
  @ContentChildren(TypeHeadOptionDirective) options !: QueryList<TypeHeadOptionDirective>;
  selectedValue: any;
  showListOptions: boolean = false;
  unsubscribe$: Subject<boolean> = new Subject<boolean>();
  listenerClickOutside: () => void;
  private _onChanged: (x: any) => void;
  private _onTouched: () => void;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef, private readonly renderer: Renderer2, private readonly elementRef: ElementRef<HTMLElement>) { }
  
  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'focus').pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this._onTouched();
      this.showListOptions = true;
      this.changeDetectorRef.detectChanges();
      this.listenerClickOutside = this.renderer.listen(document, 'click', event => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.showListOptions = false;
          this.listenerClickOutside();
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  chooseOption(option: TypeHeadOptionDirective): void {
    if(option.value) {
      this._onChanged(option.value);
    } else {
      this._onChanged(option.option);
    }
    if (option.fieldDisplay) {
      this.renderer.setProperty(this.searchInput.nativeElement, 'value', option.fieldDisplay);
    } else {
      this.renderer.setProperty(this.searchInput.nativeElement, 'value', option.option);
    }
    this.showListOptions = false;
    this.listenerClickOutside();
  }

  writeValue(value: any): void {}
  
  registerOnChange(fn: (x: any) => void ): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}