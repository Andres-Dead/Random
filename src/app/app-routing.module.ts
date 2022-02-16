import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'talento',
    loadChildren: () =>
      import('./modules/talent/talent.module').then((m) => m.TalentModule),
  },
  {
    path: 'reclutador',
    loadChildren: () =>
      import('./modules/recruiter/recruiter.module').then((m) => m.RecruiterModule),
  },
  {
    path: 'empresa',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/administrator/administrator.module').then(
        (m) => m.AdministratorModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/index/index.module').then((m) => m.IndexModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
