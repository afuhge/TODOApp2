import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotifierComponent} from './notifier.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    NotifierComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
  ],
  exports: [
    NotifierComponent,
  ],
})
export class NotifierModule {
}
