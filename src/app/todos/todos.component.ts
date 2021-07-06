import { Component, OnInit } from '@angular/core';
import {
  faCalendarAlt,
  faCheckCircle,
  faCheckSquare,
  faUsers,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {faSquare} from '@fortawesome/free-regular-svg-icons';

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
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  public check: IconDefinition = faSquare;
  public checked: IconDefinition = faCheckSquare;
  public assignees: IconDefinition = faUsers;
  public date: IconDefinition  = faCalendarAlt;
  public todo: IconDefinition = faCheckSquare;
  public todos: TODO[] = [];

  constructor() {
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

  ngOnInit(): void {
  }

  public drop(event: CdkDragDrop<TODO[], any>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  public markAsDone(todo: TODO): void {
    todo.done = ! todo.done;
  }
}
