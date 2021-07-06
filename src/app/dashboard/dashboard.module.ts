import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {HeaderModule} from '../header/header.module';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    HeaderModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
