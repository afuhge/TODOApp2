import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {faBeer, faCalendarAlt, faCheckSquare, faInfoCircle, faPlus, faUsers, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TODO} from '../../models/todo';
import {User} from '../../models/user';
import {TodosService} from '../../services/todos.service';
import {Observable} from 'rxjs';
import {formatDate} from '@angular/common';
import {UserService} from '../../services/user.service';

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
  public todos$: Observable<TODO[]>;
  public info: IconDefinition = faInfoCircle;
  public beer: IconDefinition = faBeer;
  public currentUser: User;

  constructor(
    private router: Router,
    private titleService: Title,
    private todoService: TodosService,
    private userService: UserService,
  ) {
    this.titleService.setTitle('Dashboard');
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.currentUser = user;
    });
    this.todos$ = this.todoService.loadTodosOfUser(this.currentUser.id);
    this.todos$.subscribe((el: TODO[]) => {
      const today = formatDate(new Date(), 'MM-dd-YYYY', 'en-US');
      this.todos = el.filter((a: TODO) => a.deadline ===  today);
    });
  }

  public drop(event: CdkDragDrop<TODO[], any>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  public markAsDone(todo: TODO): void {
    todo.isDone = !todo.isDone;
  }
}
