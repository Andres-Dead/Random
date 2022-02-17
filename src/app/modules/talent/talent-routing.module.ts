import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsViewComponent } from './components/jobs-view/jobs-view.component';
import { ReviewCompanyComponent } from './components/review-company/review-company.component';
import { WorkTableComponent } from './components/work-table/work-table.component';
import { TalentComponent } from './talent.component';

const routes: Routes = [
  { path:'', component: WorkTableComponent },
  { path:'resena_empresa/:id', component: ReviewCompanyComponent},
  { path:'empleos', component: JobsViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentRoutingModule { }
