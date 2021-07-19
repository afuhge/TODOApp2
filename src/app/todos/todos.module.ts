import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosComponent} from './todos.component';
import {RouterModule} from '@angular/router';
import {HeaderModule} from '../header/header.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../services/user.service';


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
  ],
  exports: [
    TodosComponent,
  ],
  providers: [
    UserService,
  ],
})
export class TodosModule {
}
