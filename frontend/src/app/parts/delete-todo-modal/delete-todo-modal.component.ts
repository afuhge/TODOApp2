import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TODO} from '../../models/todo';
import {ModalService} from '../../services/modal.service';
import {TodosService} from '../../services/todos.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
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
  ) {
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

  public deleteTodo(): void {
    this.todoService.deleteTodo(this.todo)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.deletedTodo.emit(this.todo);
      });
    this.modalService.closeModal();
  }
}
