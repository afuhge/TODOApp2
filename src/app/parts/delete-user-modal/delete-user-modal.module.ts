import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DeleteUserModalComponent} from './delete-user-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';


@NgModule({
  declarations: [DeleteUserModalComponent],
  imports: [
    CommonModule,
    ModalWrapperModule,
  ],
  exports: [
    DeleteUserModalComponent,
  ],
})
export class DeleteUserModalModule {
}
