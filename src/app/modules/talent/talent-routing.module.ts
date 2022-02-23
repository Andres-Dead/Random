import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsViewsComponent } from './components/jobs-views/jobs-views.component';
import { ReviewCompanyComponent } from './components/review-company/review-company.component';
import { WorkTableComponent } from './components/work-table/work-table.component';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path:'', component: WorkTableComponent },
  { path:'resena_empresa/:id', component: ReviewCompanyComponent},
  { path:'empleos', component: JobsViewsComponent},
  { path:'mi_mesa', component: WorkTableComponent},
  { path:'preferencias', component: AccountComponent},
  { path:'perfil', component: ProfileComponent },
  { path:'bienvenido',component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentRoutingModule { }
