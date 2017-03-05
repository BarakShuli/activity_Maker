import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AmComponent } from './am.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'am', component: AmComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AmRoutingModule { }
