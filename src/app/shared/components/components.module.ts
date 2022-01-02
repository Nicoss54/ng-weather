import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonThreeStateComponent } from './button-three-state/button-three-state.component';
import { TypeHeadOptionDirective } from './typehead/typehead-option.directive';
import { TypeHeadComponent } from './typehead/typehead.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ButtonThreeStateComponent, TypeHeadComponent, TypeHeadOptionDirective],
  exports: [ButtonThreeStateComponent, TypeHeadComponent, TypeHeadOptionDirective],
  providers: [],
})
export class ComponentsModule { } 
