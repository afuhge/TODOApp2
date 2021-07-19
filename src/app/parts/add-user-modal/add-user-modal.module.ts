import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddUserModalComponent} from './add-user-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';


@NgModule({
  declarations: [
    AddUserModalComponent,
  ],
  imports: [
    CommonModule,
    ModalWrapperModule,
  ],
  exports: [
    AddUserModalComponent,
  ],
})
export class AddUserModalModule {
}
