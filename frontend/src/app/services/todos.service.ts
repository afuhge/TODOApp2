import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TODO} from '../models/todo';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosUrl = 'http://localhost:3000/todos';  // URL to web api
  private usersUrl = 'http://localhost:3000/users';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
  ) {
  }

  public loadTodo(): Observable<TODO[]> {
    return this.http.get<TODO[]>(this.todosUrl);

  }

  public loadTodosOfUser(userId: number): Observable<TODO[]> {
    const url = `${this.usersUrl}/${userId}/todos`;
    return this.http.get<TODO[]>(url);
  }

  public addTodo(todo: TODO): Observable<TODO> {
    return this.http.post<TODO>(this.todosUrl, todo, this.httpOptions);
  }

  public editTodo(todo: TODO): Observable<TODO> {
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http.put<TODO>(url, todo, this.httpOptions);
  }

  public deleteTodo(todo: TODO): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<TODO>(url, this.httpOptions);
  }
}
