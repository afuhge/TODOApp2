import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivacyComponent} from './privacy.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../../parts/header/header.module';


@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivacyComponent,
      }
    ]),
    HeaderModule
  ],
  exports: [
    PrivacyComponent,
  ],
})
export class PrivacyModule {
}
