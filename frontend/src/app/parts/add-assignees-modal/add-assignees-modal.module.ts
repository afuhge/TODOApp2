import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAssigneesModalComponent } from './add-assignees-modal.component';
import {ModalWrapperModule} from '../../libs/modal-wrapper/modal-wrapper.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AddAssigneesModalComponent
  ],
  imports: [
    CommonModule,
    ModalWrapperModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddAssigneesModalComponent,
  ]
})
export class AddAssigneesModalModule { }
