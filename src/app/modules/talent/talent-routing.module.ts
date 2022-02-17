import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewCompanyComponent } from './components/review-company/review-company.component';
import { TalentComponent } from './talent.component';

const routes: Routes = [
  { path:'', component: TalentComponent },
  { path:'resena_empresa/:id', component: ReviewCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentRoutingModule { }
