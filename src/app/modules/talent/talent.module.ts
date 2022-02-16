import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentRoutingModule } from './talent-routing.module';
import { TalentComponent } from './talent.component';


@NgModule({
  declarations: [
    TalentComponent
  ],
  imports: [
    CommonModule,
    TalentRoutingModule
  ]
})
export class TalentModule { }
