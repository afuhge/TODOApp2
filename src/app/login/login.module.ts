import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {ReactiveFormsModule} from '@angular/forms';



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
  ],
  exports: [
    LoginComponent,
  ],
})
export class LoginModule { }
