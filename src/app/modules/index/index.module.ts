import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IndexModule { }
