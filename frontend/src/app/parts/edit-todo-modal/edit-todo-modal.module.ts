import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTodoModalComponent } from './edit-todo-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';



@NgModule({
  declarations: [
    EditTodoModalComponent
  ],
  imports: [
    CommonModule,
    ModalWrapperModule,
  ],
  exports: [
    EditTodoModalComponent,
  ]
})
export class EditTodoModalModule { }
