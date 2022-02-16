import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';


@NgModule({
  declarations: [
    RecruiterComponent
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule
  ]
})
export class RecruiterModule { }
