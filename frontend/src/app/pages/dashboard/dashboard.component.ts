import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {faCalendarAlt, faCheckSquare, faInfoCircle, faPlus, faUsers, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TODO} from '../../models/todo';
import {User} from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
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
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Dashboard');
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

  public drop(event: CdkDragDrop<TODO[], any>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  public markAsDone(todo: TODO): void {
    todo.isDone = !todo.isDone;
  }
}
