import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';
import { HeaderModule } from '../../parts/header/header.module';


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
  ],
  exports: [
    LoginComponent,
  ],
})
export class LoginModule {
}
