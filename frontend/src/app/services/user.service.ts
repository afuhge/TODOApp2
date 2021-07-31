import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user';

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:3000/users';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
  ) {
  }

  public loadUser(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);

  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }

  public editUser(user: User): Observable<User> {
    console.log('user service');
    console.log(user.id);
    const url = `${this.usersUrl}/${user.id}`;
    const blah = this.http.put<User>(url, user, this.httpOptions);
    blah.subscribe((test) => console.log(user.id));
    return blah;
  }

  public deleteUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete<User>(url, this.httpOptions);
  }
}
