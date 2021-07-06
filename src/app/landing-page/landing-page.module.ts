import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import {DashboardModule} from '../dashboard/dashboard.module';
import {HeaderComponent} from '../header/header.component';
import {HeaderModule} from '../header/header.module';



@NgModule({
  declarations: [
    LandingPageComponent,
  ],
    imports: [
        CommonModule,
        DashboardModule,
      HeaderModule,
    ],
  exports: [
    LandingPageComponent,
  ]
})
export class LandingPageModule { }
