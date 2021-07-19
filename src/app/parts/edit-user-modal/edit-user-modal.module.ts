import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditUserModalComponent} from './edit-user-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';


@NgModule({
  declarations: [EditUserModalComponent],
  imports: [
    CommonModule,
    ModalWrapperModule,
  ],
  exports: [
    EditUserModalComponent,
  ],
})
export class EditUserModalModule {
}
