import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { SocialComponent } from './components/social/social.component';
import { AboutCompanyComponent } from './components/about-company/about-company.component';
import { MissionComponent } from './components/mission/mission.component';
import { VisionComponent } from './components/vision/vision.component';
import { ValuesComponent } from './components/values/values.component';
import { CertificadosComponent } from './components/certificados/certificados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkTableComponent } from './components/work-table/work-table.component';
import { SearchTalentComponent } from './components/search-talent/search-talent.component';
import { FilterTalentComponent } from './components/filter-talent/filter-talent.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TalentProfileComponent } from './components/talent-profile/talent-profile.component';
import { VacantsComponent } from './components/vacants/vacants.component';
import { PackagesComponent } from './components/packages/packages.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { NewVacantComponent } from './components/new-vacant/new-vacant.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PortalComponent } from './components/portal/portal.component';


@NgModule({
  declarations: [
    CompanyComponent,
    ProfileComponent,
    BasicInfoComponent,
    SocialComponent,
    AboutCompanyComponent,
    MissionComponent,
    VisionComponent,
    ValuesComponent,
    CertificadosComponent,
    WorkTableComponent,
    SearchTalentComponent,
    FilterTalentComponent,
    TalentProfileComponent,
    VacantsComponent,
    PackagesComponent,
    NewPaymentComponent,
    NewVacantComponent,
    PaymentComponent,
    PortalComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class CompanyModule { }
