import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosComponent} from './todos.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../../parts/header/header.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeleteTodoModalModule} from '../../parts/delete-todo-modal/delete-todo-modal.module';
import {AddAssigneesModalModule} from '../../parts/add-assignees-modal/add-assignees-modal.module';
import { OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { TodoItemModule } from '../../parts/todo-item/todo-item.module';



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
    FormsModule,
    ReactiveFormsModule,
    DeleteTodoModalModule,
    AddAssigneesModalModule,
    OwlDateTimeModule,
    TodoItemModule,
  ],
  exports: [
    TodosComponent,
  ],
})
export class TodosModule {
}
