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
import {NotifcationService} from '../../services/notifcation.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
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
    private notifierService: NotifcationService,
  ) {
    this.titleService.setTitle('Dashboard');
    this.userService.getCurrentUser$()
      .pipe(untilDestroyed(this))
      .subscribe((user: User) => {
        this.currentUser = user;
      });
    this.todos$ = this.todoService.loadTodosOfUser(this.currentUser.id);
    this.todos$
      .pipe(untilDestroyed(this))
      .subscribe((el: TODO[]) => {
        const today = formatDate(new Date(), 'mediumDate', 'en-US');
        this.todos = el.filter((a: TODO) => formatDate(a.deadline, 'mediumDate', 'en-US') === today);
        this.todos.sort((a, b) => (a.order > b.order ? 1 : -1));
      });
  }

  public drop(event: CdkDragDrop<TODO[], any>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    event.container.data.forEach((x: TODO, index) => {
      x.order = index;
    });
    this.saveOrder();
  }

  public saveOrder(): void {
    this.todos.map((edittedTodo) => {
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

  public markAsDone(currentTodo: TODO): void {
    currentTodo.isDone = !currentTodo.isDone;
    this.todoService.editTodo(currentTodo)
      .pipe(untilDestroyed(this))
      .subscribe((todo: TODO) => {
        const index = this.todos.findIndex((el: TODO) => el.id === todo.id);
        if (index > -1) {
          this.todos.splice(index, 1, todo);
          this.notifierService.success('Edit todo successful!');
        }
      }, (err) => {
        this.notifierService.error('Edit todo failed!');
      });
  }
}
