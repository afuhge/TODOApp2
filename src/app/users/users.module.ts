import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {HeaderModule} from '../header/header.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterModule} from '../footer/footer.module';
import {UserService} from '../services/user.service';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
    ]),
    HeaderModule,
    FontAwesomeModule,
    FooterModule,
  ],
  exports: [
    UsersComponent,
  ],
  providers: [
    UserService,
  ]
})
export class UsersModule { }
