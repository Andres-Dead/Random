import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { RegisterTalentComponent } from './components/register-talent/register-talent.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialAuthServiceConfig } from 'angularx-social-login';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    AccountActivationComponent,
    RegisterTalentComponent,
    RegisterCompanyComponent,
    LoginUserComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              /* '601516400431-m2jltqie86p8l0b59b46oc140u3iiqri.apps.googleusercontent.com' */
              '106454835107-r225grfi5q1p0d5m7ale2n2hcci19io0.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('993066204897753')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class LoginModule { }
