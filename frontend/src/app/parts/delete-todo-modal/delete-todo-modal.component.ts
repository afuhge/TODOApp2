import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TODO} from '../../models/todo';
import {ModalService} from '../../services/modal.service';
import { User } from '../../models/user';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-delete-todo-modal',
  templateUrl: './delete-todo-modal.component.html',
  styleUrls: ['./delete-todo-modal.component.css']
})
export class DeleteTodoModalComponent {
  @Input() todo: TODO;
  @Output() deletedTodo: EventEmitter<TODO> = new EventEmitter<TODO>();

  constructor(
    private modalService: ModalService,
    private todoService: TodosService,
  ) { }

  public closeModal(): void {
    this.modalService.closeModal();
  }

  public deleteTodo(): void {
    this.todoService.deleteTodo(this.todo)
      .subscribe(() => {
        this.deletedTodo.emit(this.todo);
      });
    this.modalService.closeModal();
  }
}
