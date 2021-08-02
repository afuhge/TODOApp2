import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteTodoModalComponent } from './delete-todo-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';



@NgModule({
  declarations: [
    DeleteTodoModalComponent
  ],
  imports: [
    CommonModule,
    ModalWrapperModule,
  ],
  exports: [
    DeleteTodoModalComponent,
  ],
})
export class DeleteTodoModalModule { }
