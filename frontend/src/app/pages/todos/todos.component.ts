import { Component } from '@angular/core';
import {
  faCalendarAlt, faCheckSquare, faEllipsisV, faInfoCircle, faPencilAlt, faPlus, faTimesCircle, faTrash, faUsers, IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { faCalendar, faSquare } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

import { Title } from '@angular/platform-browser';
import { TODO } from '../../models/todo';
import { User } from '../../models/user';
import { TodosService } from '../../services/todos.service';
import { Observable } from 'rxjs';
import { NotifcationService } from '../../services/notifcation.service';
import { ModalService } from '../../services/modal.service';
import { DeleteTodoModalComponent } from '../../parts/delete-todo-modal/delete-todo-modal.component';
import { AddAssigneesModalComponent } from '../../parts/add-assignees-modal/add-assignees-modal.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  public check: IconDefinition = faSquare;
  public checked: IconDefinition = faCheckSquare;
  public assignees: IconDefinition = faUsers;
  public date: IconDefinition = faCalendarAlt;
  public todo: IconDefinition = faCheckSquare;
  public plusIcon: IconDefinition = faPlus;
  public todos: TODO[] = [];
  public filteredTodos: TODO[] = [];
  public todos$: Observable<TODO[]>;
  public users: User[] = [];
  public users$: Observable<User[]>;
  public info: IconDefinition = faInfoCircle;
  public editIcon: IconDefinition = faPencilAlt;
  public settings: IconDefinition = faEllipsisV;
  public  calendar: IconDefinition = faCalendar;

  public newTodo: TODO = new TODO();
  public currentUser: User;

  public resetIcon: IconDefinition = faTimesCircle;

  public searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(''),
    assignees: new FormControl([]),
  });


  public selectedAssignees: User[] = [];

  constructor(
    private userService: UserService,
    private todoService: TodosService,
    private titleService: Title,
    private notifierService: NotifcationService,
    private modalService: ModalService,
  ) {
    this.titleService.setTitle('ToDos');

    this.todos$ = this.todoService.loadTodo();
    this.todos$.subscribe((el: TODO[]) => {
      this.todos = el;
      this.filteredTodos = this.todos;
    });

    this.users$ = this.userService.loadUser();
    this.users$.subscribe((el: User[]) => {
      this.users = el;
    });

    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });

    this.searchForm.valueChanges.subscribe((value) => {
      this.filterTodos();
    });


  }

  public drop(event: CdkDragDrop<TODO[], any>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }


  public addTodo(): void {
    this.newTodo.name = this.form.get('name').value;
    this.newTodo.isDone = false;
    this.newTodo.deadline = this.form.get('date').value;
    this.newTodo.creator = this.currentUser.id;
    this.todoService.addTodo(this.newTodo).subscribe((todo: TODO) => {
      this.todos.push(todo);
      this.notifierService.success('Add ToDo successful!');
    }, (err) => {
      this.notifierService.success('Add ToDo failed!');
    });
    this.form.reset();
    this.newTodo.assignees = [];
  }

  public addAssignees($event: MouseEvent, assignees: number[]): void {
    $event.stopPropagation();
    $event.preventDefault();
    const modal = this.modalService.showModal(AddAssigneesModalComponent);
    modal.instance.selectedAssignees = assignees;
    modal.instance.allUsers = this.users;
    modal.instance.assignees.subscribe((users: User[]) => {
      this.selectedAssignees = users;
      this.newTodo.assignees = users.map((user: User) => user.id);
    });

  }

  public mapTodos(todo: TODO): User[] {
    return todo.assignees.map((assignee: number) => this.users.find((user: User) => user.id === assignee));
  }

  public reset(): void {
    this.searchForm.reset();
    this.resetFilteredTodos();
  }

  private resetFilteredTodos(): void {
    this.filteredTodos = this.todos;
  }

  private filterTodos(): void {
    this.resetFilteredTodos();
    const searchTerm = this.searchForm.get('searchTerm').value?.trim();
    if (searchTerm !== '') {
      this.filteredTodos = this.filteredTodos.filter((todo: TODO) => {
        return todo.name.includes(searchTerm) || formatDate(todo.deadline, 'mediumDate', 'en-US').includes(searchTerm);
      });
    }
  }
}
