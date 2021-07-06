import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';



@NgModule({
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ]
})
export class FooterModule { }
