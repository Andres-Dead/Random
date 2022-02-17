import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { FilterTalentComponent } from './components/filter-talent/filter-talent.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchTalentComponent } from './components/search-talent/search-talent.component';
import { TalentProfileComponent } from './components/talent-profile/talent-profile.component';
import { VacantsComponent } from './components/vacants/vacants.component';
import { WorkTableComponent } from './components/work-table/work-table.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path:'mesa_trabajo', component: WorkTableComponent},
  { path:'buscar_talento', component: SearchTalentComponent},
  { path:'filtrar_talento', component: FilterTalentComponent},
  { path:'perfil_talento/:id/:idv', component: TalentProfileComponent},
  { path:'vacantes', component:VacantsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
