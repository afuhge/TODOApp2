import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {HeaderComponent} from '../header/header.component';
import {HeaderModule} from '../header/header.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    TodosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodosComponent,
      },
    ]),
    HeaderModule,
    FontAwesomeModule,
    DragDropModule,
  ],
  exports: [
    TodosComponent,
  ],
})
export class TodosModule { }
