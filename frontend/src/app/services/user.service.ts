import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {LocalStorageService} from './local-storage.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:3000/users';  // URL to web api
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {

    this.currentUser.next(this.localStorageService.getCurrentUser());
  }

  public loadUser(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);

  }

  public getCurrentUser(): Observable<User> {
    return this.currentUser.asObservable();
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
      /*.pipe(
      map((res: any) => {
        return User.fromJSON(res);
      })*/
  }

  public editUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions);
  }

  public deleteUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete<User>(url, this.httpOptions);
  }
}
