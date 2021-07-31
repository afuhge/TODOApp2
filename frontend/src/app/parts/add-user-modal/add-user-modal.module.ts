import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddUserModalComponent} from './add-user-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputModule } from 'src/app/libs/form-input/form-input.module';
import { UserService } from '../../services/user.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AddUserModalComponent,
  ],
    imports: [
        CommonModule,
        ModalWrapperModule,
        ReactiveFormsModule,
        FormInputModule,
        FontAwesomeModule,
    ],
  exports: [
    AddUserModalComponent,
  ],
})
export class AddUserModalModule {
}