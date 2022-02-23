import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterComponent } from './recruiter.component';
import { NewVacantComponent } from './components/new-vacant/new-vacant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WorkTableComponent } from './components/work-table/work-table.component';
import { PortalComponent } from './components/portal/portal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditVacantComponent } from './components/edit-vacant/edit-vacant.component';


@NgModule({
  declarations: [
    RecruiterComponent,
    NewVacantComponent,
    WelcomeComponent,
    WorkTableComponent,
    PortalComponent,
    ProfileComponent,
    EditVacantComponent,
  ],
  imports: [
    CommonModule,
    RecruiterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class RecruiterModule { }
