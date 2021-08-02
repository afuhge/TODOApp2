import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TODO} from '../../models/todo';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-delete-todo-modal',
  templateUrl: './delete-todo-modal.component.html',
  styleUrls: ['./delete-todo-modal.component.css']
})
export class DeleteTodoModalComponent implements OnInit {
  @Input() todo: TODO;
  @Output() deletedTodo: EventEmitter<TODO> = new EventEmitter<TODO>();

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

  public deleteTodo(): void {

  }
}
