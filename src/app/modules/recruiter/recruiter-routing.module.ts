import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './components/portal/portal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkTableComponent } from './components/work-table/work-table.component';

const routes: Routes = [
  { path: '', component: WorkTableComponent },
  { path: 'portal', component: PortalComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
