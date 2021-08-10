import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import { HeaderModule } from '../../parts/header/header.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
    ReactiveFormsModule,
    HeaderModule,
    FontAwesomeModule,
  ],
  exports: [
    LoginComponent,
  ],
})
export class LoginModule {
}
