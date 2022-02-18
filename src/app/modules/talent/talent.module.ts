import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentRoutingModule } from './talent-routing.module';
import { TalentComponent } from './talent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { JobPreferencesComponent } from './components/job-preferences/job-preferences.component';
import { WorkExperienceComponent } from './components/work-experience/work-experience.component';
import { EducationComponent } from './components/education/education.component';
import { RecognitionsComponent } from './components/recognitions/recognitions.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ReviewCompanyComponent } from './components/review-company/review-company.component';
import { WorkTableComponent } from './components/work-table/work-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { JobsViewsComponent } from './components/jobs-views/jobs-views.component';

@NgModule({
  declarations: [
    TalentComponent,
    AccountComponent,
    BasicInfoComponent,
    PresentationComponent,
    PersonInfoComponent,
    JobPreferencesComponent,
    WorkExperienceComponent,
    EducationComponent,
    RecognitionsComponent,
    LanguagesComponent,
    SkillsComponent,
    ReviewCompanyComponent,
    WorkTableComponent,
    JobsViewsComponent,
  ],
  imports: [
    CommonModule,
    TalentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
})
export class TalentModule {}
