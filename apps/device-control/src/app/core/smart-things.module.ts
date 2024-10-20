import { NgModule } from '@angular/core';
import { TvControllerComponent } from './components/tv-controller/tv-controller.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [TvControllerComponent],
  declarations: [TvControllerComponent],
  providers: [],
})
export class SmartThingsModule {}
