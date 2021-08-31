import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HeaderModule} from '../../parts/header/header.module';


@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
      },
    ]),
    ReactiveFormsModule,
    FontAwesomeModule,
    HeaderModule,
  ],
  exports: [
    RegisterComponent,
  ],
})
export class RegisterModule {
}
