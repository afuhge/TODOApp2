import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {InitialsPipe} from './initials-pipe';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    InitialsPipe,
  ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {
}
