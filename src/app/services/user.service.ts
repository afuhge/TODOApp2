import { Injectable } from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../users/users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    const users: User[] = [
      {
        firstName: 'Annika',
        lastName: 'Fuh',
        userName: 'annie',
        password: '12345',
        color: '#ddd',
        email: 'a.fuh@blah.de'
      },
      {
        firstName: 'Anni',
        lastName: 'Fu',
        userName: 'annie',
        password: '12345',
        color: '#fff',
        email: 'a.fuh@blah.de'
      },
      {
        firstName: 'Peter',
        lastName: 'Parker',
        userName: 'annie',
        password: '12345',
        color: '#000',
        email: 'a.fuh@blah.de'
      },
    ];

    return of(users);
  }
}
