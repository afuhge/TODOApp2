import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './landing-page.component';
import {HeaderModule} from '../header/header.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
        {
          path: '',
          component: LandingPageComponent,
        }
      ]
    ),
  ],
  exports: [
    LandingPageComponent,
  ]
})
export class LandingPageModule {
}
