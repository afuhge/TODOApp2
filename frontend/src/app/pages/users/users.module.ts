import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../../parts/header/header.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterModule} from '../../parts/footer/footer.module';
import {UserService} from '../../services/user.service';
import {AddUserModalModule} from '../../parts/add-user-modal/add-user-modal.module';
import {EditUserModalModule} from '../../parts/edit-user-modal/edit-user-modal.module';
import {DeleteUserModalModule} from '../../parts/delete-user-modal/delete-user-modal.module';
import {ReactiveFormsModule} from '@angular/forms';


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
    AddUserModalModule,
    EditUserModalModule,
    DeleteUserModalModule,
    ReactiveFormsModule,
  ],
  exports: [
    UsersComponent,
  ],
  providers: [
    UserService,
  ]
})
export class UsersModule {
}
