import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddUserModalComponent} from './add-user-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';
import { ReactiveFormsModule } from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AddUserModalComponent,
  ],
    imports: [
        CommonModule,
        ModalWrapperModule,
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
  exports: [
    AddUserModalComponent,
  ],
})
export class AddUserModalModule {
}
