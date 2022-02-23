import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { RegisterTalentComponent } from './components/register-talent/register-talent.component';
import { LoginComponent } from './login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path: 'registrar_empresa', component: RegisterCompanyComponent},
  { path: 'registrarse', component: RegisterTalentComponent},
  { path: 'reestablecer', component: ForgotPasswordComponent},
  { path: 'cambiar', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
