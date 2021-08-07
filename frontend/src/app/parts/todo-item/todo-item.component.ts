import { Component, Input, OnInit } from '@angular/core';
import { TODO } from '../../models/todo';
import { faCheckSquare, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteTodoModalComponent } from '../delete-todo-modal/delete-todo-modal.component';
import { UserService } from '../../services/user.service';
import { TodosService } from '../../services/todos.service';
import { Title } from '@angular/platform-browser';
import { NotifcationService } from '../../services/notifcation.service';
import { ModalService } from '../../services/modal.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { AddAssigneesModalComponent } from '../add-assignees-modal/add-assignees-modal.component';

class FormData {
  name: string;
  date: string;
}
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TODO;

  public deleteIcon: IconDefinition = faTrash;
  public check: IconDefinition = faSquare;
  public checked: IconDefinition = faCheckSquare;
  public todos: TODO[] = [];
  public filteredTodos: TODO[] = [];
  public todos$: Observable<TODO[]>;
  public users: User[] = [];
  public users$: Observable<User[]>;

  public todoForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(''),
  });

  public formData: FormData = new FormData();

  public markAsDone(todo: TODO): void {
    todo.isDone = !todo.isDone;
    this.todoService.editTodo(todo).subscribe((edittedTodo: TODO) => {
      const index = this.todos.findIndex((el: TODO) => el.id === edittedTodo.id);
      if (index > -1) {
        this.todos.splice(index, 1, edittedTodo);
      }
    }, (err) => {
      this.notifierService.error('Mark todo failed!');
    });
  }

  public deleteTodo(todo: TODO): void {
    const modal = this.modalService.showModal(DeleteTodoModalComponent);
    modal.instance.todo = todo;
    modal.instance.deletedTodo.subscribe(() => {
      const index = this.todos.findIndex((el: TODO) => el.id === todo.id);
      console.log(index);
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
    this.todos$ = this.todoService.loadTodo();
    this.todos$.subscribe((el: TODO[]) => {
      this.todos = el;
      this.filteredTodos = this.todos;
    });

    this.users$ = this.userService.loadUser();
    this.users$.subscribe((el: User[]) => {
      this.users = el;
    });


    this.todoForm.valueChanges
      .subscribe((value) => {
        this.formData = value as FormData;
      });

    console.log(this.todo);

  }

  public mapTodos(todo: TODO): User[] {
    return todo.assignees.map((assignee: number) => this.users.find((user: User) => user.id === assignee));
  }

  public addAssignees($event: MouseEvent, assignees: number[]): void {
    $event.stopPropagation();
    $event.preventDefault();
    const modal = this.modalService.showModal(AddAssigneesModalComponent);
    modal.instance.selectedAssignees = assignees;
    modal.instance.assignees.subscribe((users: User[]) => {
      console.log(users);
     //  this.selectedAssignees = users;
      this.todo.assignees = users.map((user: User) => user.id);
      console.log(this.todo.assignees);
    });

  }

  ngOnInit(): void {
    this.todoForm.patchValue(this.formData);
  }

}
