import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotifierComponent} from './notifier.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NotifierComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    NotifierComponent,
  ],
})
export class NotifierModule { }
