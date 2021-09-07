import {Component} from '@angular/core';
import {
  faBoxOpen,
  faCalendarAlt,
  faCheckSquare,
  faEllipsisV,
  faInfoCircle,
  faPencilAlt,
  faPlus,
  faSearch,
  faTimesCircle,
  faUserPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faCalendar, faSquare} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

import {Title} from '@angular/platform-browser';
import {TODO} from '../../models/todo';
import {User} from '../../models/user';
import {TodosService} from '../../services/todos.service';
import {Observable} from 'rxjs';
import {NotifcationService} from '../../services/notifcation.service';
import {ModalService} from '../../services/modal.service';
import {AddAssigneesModalComponent} from '../../parts/add-assignees-modal/add-assignees-modal.component';
import {formatDate} from '@angular/common';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  public check: IconDefinition = faSquare;
  public checked: IconDefinition = faCheckSquare;
  public assignees: IconDefinition = faUserPlus;
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
  public calendar: IconDefinition = faCalendar;
  public boxOpen: IconDefinition = faBoxOpen;
  public search: IconDefinition = faSearch;

  public newTodo: TODO = new TODO();
  public currentUser: User;
  public isFiltered = false;

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
    this.todos$
      .pipe(untilDestroyed(this))
      .subscribe((el: TODO[]) => {
        this.todos = el;
        this.filteredTodos = this.todos;
        this.filteredTodos.sort((a, b) => (a.order > b.order ? 1 : -1));
      });

    this.users$ = this.userService.loadUser();
    this.users$
      .pipe(untilDestroyed(this))
      .subscribe((el: User[]) => {
        this.users = el;
      });

    this.userService.currentUser$
      .pipe(untilDestroyed(this))
      .subscribe((user: User) => {
        this.currentUser = user;
      });

    this.searchForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.filterTodos();
      });

    this.searchForm.get('searchTerm').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.isFiltered = value !== '';
      });


  }

  public drop(event: CdkDragDrop<TODO[], any>): void {
    moveItemInArray(this.filteredTodos, event.previousIndex, event.currentIndex);
    event.container.data.forEach((x: TODO, index) => {
      x.order = index;
    });
    this.saveOrder();
  }

  public saveOrder(): void {
    this.filteredTodos.map((edittedTodo) => {
      this.todoService.editTodo(edittedTodo)
        .pipe(untilDestroyed(this))
        .subscribe((todo: TODO) => {
          const index = this.todos.findIndex((el: TODO) => el.id === todo.id);
          if (index > -1) {
            this.todos.splice(index, 1, todo);
          }
        });
    });
  }

  public addTodo(): void {
    this.newTodo.name = this.form.get('name').value;
    this.newTodo.isDone = false;
    this.newTodo.deadline = this.form.get('date').value;
    this.newTodo.creator = this.currentUser.id;
    this.todoService.addTodo(this.newTodo)
      .pipe(untilDestroyed(this))
      .subscribe((todo: TODO) => {
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
    modal.instance.assignees
      .pipe(untilDestroyed(this))
      .subscribe((users: User[]) => {
        this.selectedAssignees = users;
        this.newTodo.assignees = users.map((user: User) => user.id);
      });

  }

  public mapTodos(todo: TODO): User[] {
    return todo.assignees.map((assignee: number) => this.users.find((user: User) => user.id === assignee));
  }

  public reset(): void {
    this.searchForm.reset();
    this.isFiltered = false;
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
