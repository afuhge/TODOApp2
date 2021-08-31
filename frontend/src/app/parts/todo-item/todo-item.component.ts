import {Component, Input, OnInit} from '@angular/core';
import {TODO} from '../../models/todo';
import {faCheckSquare, faTrash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faCalendar, faSquare} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DeleteTodoModalComponent} from '../delete-todo-modal/delete-todo-modal.component';
import {UserService} from '../../services/user.service';
import {TodosService} from '../../services/todos.service';
import {Title} from '@angular/platform-browser';
import {NotifcationService} from '../../services/notifcation.service';
import {ModalService} from '../../services/modal.service';
import {User} from '../../models/user';
import {AddAssigneesModalComponent} from '../add-assignees-modal/add-assignees-modal.component';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

class FormData {
  name: string;
  date: string;
}

@UntilDestroy()
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TODO;
  @Input() todos: TODO[];
  @Input() users: User[];

  public deleteIcon: IconDefinition = faTrash;
  public check: IconDefinition = faSquare;
  public checked: IconDefinition = faCheckSquare;
  public calendar: IconDefinition = faCalendar;
  public filteredTodos: TODO[] = [];

  public todoForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(''),
  });

  public formData: FormData = new FormData();

  public markAsDone(todo: TODO): void {
    todo.isDone = !todo.isDone;
    this.save(todo);
  }

  public deleteTodo(todo: TODO): void {
    const modal = this.modalService.showModal(DeleteTodoModalComponent);
    modal.instance.todo = todo;
    modal.instance.deletedTodo
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const index = this.todos.findIndex((el: TODO) => el.id === todo.id);
        if (index > -1) {
          this.todos.splice(index, 1);
          this.notifierService.success('Delete todo successful!');
        }
      }, (err) => {
        this.notifierService.error('Delete todo failed!');
      });
  }

  constructor(
    private userService: UserService,
    private todoService: TodosService,
    private titleService: Title,
    private notifierService: NotifcationService,
    private modalService: ModalService,
  ) {
    this.filteredTodos = this.todos;

    this.todoForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        const data: FormData = value as FormData;
        this.formData = data;
      });

  }

  public mapTodos(todo: TODO): User[] {
    return todo.assignees.map((assignee: number) => this.users.find((user: User) => user.id === assignee));
  }

  public addAssignees($event: MouseEvent, assignees: number[]): void {
    $event.stopPropagation();
    $event.preventDefault();
    const modal = this.modalService.showModal(AddAssigneesModalComponent);
    modal.instance.selectedAssignees = assignees;
    modal.instance.assignees
      .pipe(untilDestroyed(this))
      .subscribe((users: User[]) => {
        this.todo.assignees = users.map((user: User) => user.id);
        this.save(this.todo);
      });

  }

  ngOnInit(): void {
    this.formData = {
      name: this.todo?.name,
      date: this.todo?.deadline,
    };
    this.todoForm.patchValue(this.formData);
  }

  private save(edittedTodo: TODO): void {
    this.todoService.editTodo(edittedTodo)
      .pipe(untilDestroyed(this))
      .subscribe((todo: TODO) => {
        const index = this.todos.findIndex((el: TODO) => el.id === todo.id);
        if (index > -1) {
          this.todos.splice(index, 1, todo);
          this.notifierService.success('Edit todo successful!');
        }
      }, (err) => {
        this.notifierService.error('Edit todo failed!');
      });
  }

  public saveDate($event: any): void {
    const edittedTodo: TODO = {
      ...this.todo,
      deadline: $event.value,
    };
    this.save(edittedTodo);
  }

  public saveName(): void {
    const edittedTodo: TODO = {
      ...this.todo,
      name: this.todoForm.get('name').value,
    };
    this.save(edittedTodo);
  }
}
