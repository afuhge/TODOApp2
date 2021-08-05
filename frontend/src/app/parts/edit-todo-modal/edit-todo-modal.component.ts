import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TODO } from '../../models/todo';
import { ModalService } from '../../services/modal.service';
import { TodosService } from '../../services/todos.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.css'],
})
export class EditTodoModalComponent implements OnInit {
  @Input() todo: TODO;
  @Output() edittedTodo: EventEmitter<TODO> = new EventEmitter<TODO>();

  public actionDisabled: boolean;
  public form: FormGroup = new FormGroup({});

  constructor(private modalService: ModalService, private todoService: TodosService) {
  }

  ngOnInit(): void {
  }

  public editTodo(): void {
    if (!this.actionDisabled) {
      const edittedTodo: TODO = {
        id: this.todo.id, ...this.form.value,
      };
      this.todoService.editTodo(edittedTodo)
        .subscribe((todo: TODO) => {
          this.edittedTodo.emit(todo);
        });
      this.modalService.closeModal();
    }
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }
}
