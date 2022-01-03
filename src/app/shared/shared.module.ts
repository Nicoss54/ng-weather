import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  imports: [],
  exports: [ComponentsModule, PipesModule, CommonModule, ReactiveFormsModule],
  providers: [],
})
export class SharedModule { }
