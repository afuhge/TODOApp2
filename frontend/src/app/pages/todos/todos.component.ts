import {Component} from '@angular/core';
import {faCalendarAlt, faCheckSquare, faInfoCircle, faPlus, faUsers, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

import {Title} from '@angular/platform-browser';
import {TODO} from '../../models/todo';
import {User} from '../../models/user';



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
  public isLoading: boolean = true;
  public info: IconDefinition = faInfoCircle;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl(''),
    assignees: new FormControl([]),
  });
  public users: User[] = [];
  public isHidden = true;

  constructor(
    private userService: UserService,
    private titleService: Title
  ) {
    this.titleService.setTitle('TODOs');
    userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
    this.todos = [
      {
        name: 'Clean dishes',
        deadline: '11-02-2012',
        creator: 1,
        assignees: [
          1,
          2,
          3,
          4,
        ],
        isDone: false,
      },
      {
        name: 'Clean kitchen',
        deadline: '11-02-2012',
        creator: 1,
        assignees: [
          1,
          2,
          3,
          4,
        ],
        isDone: false,
      },
      {
        name: 'Cook',
        deadline: '11-02-2012',
        creator: 1,
        assignees: [
          1,
          2,
          3,
          4,
        ],
        isDone: false,
      },
    ];
    this.isLoading = false;
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
    this.todos.push({
      name: this.form.get('name').value,
      isDone: false,
      assignees: this.setAssignees(this.form.get('assignees').value),
      deadline: this.form.get('date').value,
      creator: 1,
    });

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
