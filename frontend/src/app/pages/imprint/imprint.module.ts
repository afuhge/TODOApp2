import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImprintComponent} from './imprint.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../../parts/header/header.module';


@NgModule({
  declarations: [
    ImprintComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ImprintComponent,
      }
    ]),
    HeaderModule
  ],
  exports: [
    ImprintComponent,
  ],
})
export class ImprintModule {
}
