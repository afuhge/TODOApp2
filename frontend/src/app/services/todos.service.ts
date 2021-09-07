import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TODO} from '../models/todo';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AbstractAPiService} from './AbstractAPiService';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService extends AbstractAPiService {

  private todosUrl = `${this.BASE_URL}/todos`;  // URL to web api
  private usersUrl = `${this.BASE_URL}/users`;  // URL to web api



  constructor(
    private http: HttpClient,
    protected localStorageService: LocalStorageService,
  ) {
    super(localStorageService);
  }

  public loadTodo(): Observable<TODO[]> {
    return this.http.get<TODO[]>(this.todosUrl, this.httpOptions)
      .pipe(
        map((res: any[]) => {
          return res.map((todo) => TODO.fromJSON(todo));
        }));

  }

  public loadTodosOfUser(userId: number): Observable<TODO[]> {
    const url = `${this.usersUrl}/${userId}/todos`;
    return this.http.get<TODO[]>(url, this.httpOptions)
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
