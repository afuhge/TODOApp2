import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoItemComponent} from './todo-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OwlDateTimeModule} from '@danielmoncada/angular-datetime-picker';


@NgModule({
  declarations: [
    TodoItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DragDropModule,
    OwlDateTimeModule,
  ],
  exports: [
    TodoItemComponent,
  ],
})
export class TodoItemModule {
}
