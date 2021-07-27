import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {TODO} from '../models/todo';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosUrl = 'http://localhost:3000/todos';  // URL to web api
  public allTodos: TODO[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  public getTodos(): Observable<TODO[]> {
    const todos = this.http.get<TODO[]>(this.todosUrl);
    todos.subscribe((u) => {
      console.log('hi');
      this.allTodos = u;
    });
    console.log(this.allTodos);
    return of(this.allTodos);
  }

  public addTodo(todo: TODO): void {
    this.allTodos.push(todo);
  }

  public editTodo(todo: TODO): void {}

  public deleteTodo(todo: TODO): void {}
}
