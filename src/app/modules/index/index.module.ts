import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsComponent } from './components/jobs/jobs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { ListCompaniesComponent } from './components/list-companies/list-companies.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';


@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    JobsComponent,
    JobDetailsComponent,
    ListCompaniesComponent,
    CompanyProfileComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class IndexModule { }
