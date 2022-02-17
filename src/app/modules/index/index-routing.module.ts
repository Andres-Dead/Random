import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { HomeComponent } from './components/home/home.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ListCompaniesComponent } from './components/list-companies/list-companies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empleos', component: JobsComponent},
  { path: 'detalle_empleo/:id', component: JobDetailsComponent},
  { path: 'listar_empresas', component: ListCompaniesComponent},
  { path: 'perfil_empresa/:id', component: CompanyProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
