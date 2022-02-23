import { WelcomeComponent } from './../recruiter/components/welcome/welcome.component';
import { EditVacantComponent } from './components/edit-vacant/edit-vacant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterTalentComponent } from './components/filter-talent/filter-talent.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { NewVacantComponent } from './components/new-vacant/new-vacant.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PostulatesComponent } from './components/postulates/postulates.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchTalentComponent } from './components/search-talent/search-talent.component';
import { TalentProfileComponent } from './components/talent-profile/talent-profile.component';
import { VacantsComponent } from './components/vacants/vacants.component';
import { WorkTableComponent } from './components/work-table/work-table.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'mesa_trabajo', component: WorkTableComponent },
  { path: 'buscar_talento', component: SearchTalentComponent },
  { path: 'filtrar_talento', component: FilterTalentComponent },
  { path: 'perfil_talento/:id/:idv', component: TalentProfileComponent },
  { path: 'vacantes', component: VacantsComponent },
  { path: 'paquetes', component: PackagesComponent },
  { path: 'renovar_paquete/:id', component: NewPaymentComponent },
  { path: 'nueva_vacante', component: NewVacantComponent },
  { path: 'postulados/:id', component: PostulatesComponent },
  { path: 'vacante/:id',component:EditVacantComponent},
  { path: 'perfil', component:ProfileComponent},
  { path: 'bienvenido', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
