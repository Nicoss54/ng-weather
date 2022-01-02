import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { PipesModule } from './pipes/pipes.module';


@NgModule({
  imports: [],
  exports: [ComponentsModule, PipesModule],
  providers: [],
})
export class SharedModule { }
