import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmComponent } from './am.component';
import { AmRoutingModule } from './am-routing.module';

@NgModule({
  imports: [CommonModule, AmRoutingModule],
  declarations: [AmComponent],
  exports: [AmComponent]
})
export class AmModule { }
