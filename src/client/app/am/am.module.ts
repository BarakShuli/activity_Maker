import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmComponent } from './am.component';
import { AmRoutingModule } from './am-routing.module';
import { widgetComponent, IWidgetStyleObj } from './am.Widget.component';

@NgModule({
  imports: [CommonModule, AmRoutingModule ],
  declarations: [AmComponent, widgetComponent],
  entryComponents: [widgetComponent],
  exports: [AmComponent]
})
export class AmModule { }
