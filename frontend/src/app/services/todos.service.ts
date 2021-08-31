import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TODO} from '../models/todo';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private todosUrl = 'http://localhost:3000/todos';  // URL to web api
  private usersUrl = 'http://localhost:3000/users';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  public loadTodo(): Observable<TODO[]> {
    return this.http.get<TODO[]>(this.todosUrl)
      .pipe(
        map((res: any[]) => {
          return res.map((todo) => TODO.fromJSON(todo));
        }));

  }

  public loadTodosOfUser(userId: number): Observable<TODO[]> {
    const url = `${this.usersUrl}/${userId}/todos`;
    return this.http.get<TODO[]>(url)
      .pipe(
        map((res: any[]) => {
          return res.map((todo) => TODO.fromJSON(todo));
        }));
  }

  public addTodo(todo: TODO): Observable<TODO> {
    return this.http.post<TODO>(this.todosUrl, todo, this.httpOptions)
      .pipe(
        map((res: any) => {
          return TODO.fromJSON(res);
        }));
  }

  public editTodo(todo: TODO): Observable<TODO> {
    const url = `${this.todosUrl}/${todo.id}`;

    return this.http.put<TODO>(url, todo, this.httpOptions)
      .pipe(
        map((res: any) => {
          return TODO.fromJSON(res);
        }));
  }

  public deleteTodo(todo: TODO): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<TODO>(url, this.httpOptions);
  }
}
