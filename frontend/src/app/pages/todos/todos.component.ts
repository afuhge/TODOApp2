import {Component} from '@angular/core';
import {
  faCalendarAlt,
  faCheckSquare,
  faEllipsisV,
  faInfoCircle,
  faPencilAlt,
  faPlus,
  faTrash,
  faUsers,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

import {Title} from '@angular/platform-browser';
import {TODO} from '../../models/todo';
import {User} from '../../models/user';
import {TodosService} from '../../services/todos.service';
import {Observable} from 'rxjs';
import {NotifcationService} from '../../services/notifcation.service';
import {ModalService} from '../../services/modal.service';
import {EditTodoModalComponent} from '../../parts/edit-todo-modal/edit-todo-modal.component';
import {DeleteTodoModalComponent} from '../../parts/delete-todo-modal/delete-todo-modal.component';
import {AddAssigneesModalComponent} from '../../parts/add-assignees-modal/add-assignees-modal.component';


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
  public todos$: Observable<TODO[]>;
  public users: User[] = [];
  public users$: Observable<User[]>;
  public info: IconDefinition = faInfoCircle;
  public editIcon: IconDefinition = faPencilAlt;
  public deleteIcon: IconDefinition = faTrash;
  public settings: IconDefinition = faEllipsisV;

  public newTodo: TODO = new TODO();
  public currentUser: User;


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
    });

    this.users$ = this.userService.loadUser();
    this.users$.subscribe((el: User[]) => {
      this.users = el;
    });

    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });
  }


  public drop(event: CdkDragDrop<TODO[], any>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  public markAsDone(todo: TODO): void {
    todo.isDone = !todo.isDone;
  }


  public editTodo(todo: TODO): void {
    console.log('edit todo');
    const modal = this.modalService.showModal(EditTodoModalComponent);
    modal.instance.todo = todo;
    modal.instance.edittedTodo.subscribe(
      (edittedTodo: TODO) => {
        const index = this.todos.findIndex((el: TODO) => el.id === edittedTodo.id);
        if (index > -1) {
          this.todos.splice(index, 1, edittedTodo);
          this.notifierService.success('Edit todo successful!');
        }
      },
      (err) => {
        this.notifierService.error('Edit todo failed!');
      }
    );
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
      },
      (err) => {
        this.notifierService.error('Delete todo failed!');
      });
  }


  public addTodo(): void {
    this.newTodo.name = this.form.get('name').value;
    this.newTodo.isDone = false;
    this.newTodo.deadline = this.form.get('date').value;
    this.newTodo.creator = this.currentUser.id;
    this.todoService.addTodo(this.newTodo).subscribe((todo: TODO) => {
      console.log(todo);
      this.todos.push(todo);
      this.notifierService.success('Add ToDo successful!');
    }, (err) => {
      this.notifierService.success('Add ToDo failed!');
    });
    this.form.reset();
  }


  public addAssignees($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();
    const modal = this.modalService.showModal(AddAssigneesModalComponent);
    modal.instance.assignees.subscribe((users: User[]) => {
      console.log(users);
      this.selectedAssignees = users;
      this.newTodo.assignees = users.map((user: User) => user.id);
      console.log(this.newTodo.assignees);
    });

  }

  public mapTodos(todo: TODO): User[] {
    return todo.assignees.map((assignee: number) => this.users.find((user: User) => user.id === assignee));
  }
}
