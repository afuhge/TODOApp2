import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TODO} from '../../models/todo';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.css']
})
export class EditTodoModalComponent implements OnInit {
  @Input() todo: TODO;
  @Output() edittedTodo: EventEmitter<TODO> = new EventEmitter<TODO>();

  public actionDisabled: boolean;

  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

  public editTodo(): void {

  }

 public closeModal(): void {
    this.modalService.closeModal();
  }
}
