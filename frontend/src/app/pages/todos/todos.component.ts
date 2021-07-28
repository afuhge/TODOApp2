import {Component} from '@angular/core';
import {faCalendarAlt, faCheckSquare, faInfoCircle, faPlus, faUsers, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

import {Title} from '@angular/platform-browser';
import {TODO} from '../../models/todo';
import {User} from '../../models/user';
import {TodosService} from '../../services/todos.service';
import {Observable} from 'rxjs';



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

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(''),
    assignees: new FormControl([]),
  });
  public isHidden = true;

  constructor(
    private userService: UserService,
    private todoService: TodosService,
    private titleService: Title
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

  public onSubmit(): void {
    console.log(this.form.get('assignees').value);
    this.form.reset();
    this.isHidden = true;
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
