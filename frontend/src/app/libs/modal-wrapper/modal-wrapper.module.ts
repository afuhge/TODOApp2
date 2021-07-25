import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalWrapperComponent} from './modal-wrapper.component';


@NgModule({
  declarations: [
    ModalWrapperComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ModalWrapperComponent,
  ],
})
export class ModalWrapperModule {
}
