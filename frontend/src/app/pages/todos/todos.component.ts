import {Component} from '@angular/core';
import {
  faCalendarAlt,
  faCheckSquare, faEllipsisV,
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

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(''),
    assignees: new FormControl([]),
  });
  public isHidden = true;

  constructor(
    private userService: UserService,
    private todoService: TodosService,
    private titleService: Title,
    private notifierService: NotifcationService,
    private modalService: ModalService,
  ) {
    this.titleService.setTitle('TODOs');

    this.todos$ = this.todoService.loadTodo();
    this.todos$.subscribe((el: TODO[]) => {
      this.todos = el;
    });

    this.users$ = this.userService.loadUser();
    this.users$.subscribe((el: User[]) => {
      this.users = el;
    });
  }

  public toggleDropDown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.isHidden = !this.isHidden;
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
    console.log('delete todo');
    const modal = this.modalService.showModal(DeleteTodoModalComponent);
    modal.instance.todo = todo;
    modal.instance.deletedTodo.subscribe(() => {
        const index = this.todos.findIndex((el: TODO) => el.id === todo.id);
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
    this.isHidden = true;
   // notifications
    console.log(' TODO: add todo');
  }

  private setAssignees(users: User[]): number[] {
    const assignees: number[] = [];
    users.forEach((user: User) => {
      assignees.push(user.id);
    });

    console.log(assignees);
    return assignees;
  }
}
