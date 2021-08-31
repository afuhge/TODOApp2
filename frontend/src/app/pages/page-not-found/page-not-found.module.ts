import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found.component';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HeaderModule} from '../../parts/header/header.module';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageNotFoundComponent,
      },
    ]),
    FontAwesomeModule,
    HeaderModule,
  ],
  exports: [
    PageNotFoundComponent,
  ],
})
export class PageNotFoundModule {
}
