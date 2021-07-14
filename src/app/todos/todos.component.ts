import { Component, OnInit } from '@angular/core';
import {
  faCalendarAlt,
  faCheckCircle,
  faCheckSquare, faPlus,
  faUsers,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../users/users.component';
import {Title} from '@angular/platform-browser';

class TODO {
  public name: string;
  public date: string;
  public assignees: Assignee[];
  public done: boolean;
}
class Assignee {
  public name: string;
  public color: string;
}
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  public check: IconDefinition = faSquare;
  public checked: IconDefinition = faCheckSquare;
  public assignees: IconDefinition = faUsers;
  public date: IconDefinition  = faCalendarAlt;
  public todo: IconDefinition = faCheckSquare;
  public plusIcon: IconDefinition = faPlus;
  public todos: TODO[] = [];

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
        date: '07.07.2021',
        done: false,
        assignees: [
          {
            name: 'Annie',
            color: '#123456'
          },
          {
            name: 'Alex',
            color: '#ddd',
          }
        ]
      },
      {
        name: 'Clean bathroom',
        date: '07.07.2021',
        done: false,
        assignees: [
          {
            name: 'Annie',
            color: '#172ab7'
          },
          {
            name: 'Mike',
            color: '#555',
          }
        ]
      },
      {
        name: 'Clean room',
        date: '07.07.2021',
        done: false,
        assignees: [
          {
            name: 'Anton',
            color: '#123456'
          },
          {
            name: 'Hannah',
            color: '#555',
          }
        ]
      }
    ];
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
    todo.done = ! todo.done;
  }

  public onSubmit(): void {
    console.log(this.form.get('assignees').value);
    this.todos.push({
      name: this.form.get('name').value,
      done: false,
      assignees: this.setAssignees(this.form.get('assignees').value),
      date: this.form.get('date').value,
    });

    this.form.reset();
    this.isHidden = true;
  }

  private setAssignees(users: User[]): Assignee[] {
    const assignees: Assignee[] = [];
    users.forEach((user: User) => {
      const newAssignee: Assignee = {
        name: user.firstName + ' ' + user.lastName,
        color: user.color,
      };
      assignees.push(newAssignee);
    });

    console.log(assignees);
    return assignees;
  }
}
