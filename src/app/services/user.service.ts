import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../users/users.component';

@Injectable()
export class UserService {

  private usersUrl = 'api/users';  // URL to web api
  public allUsers: User[] = [];
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor() {
    const users: User[] = [
      {
        firstName: 'Annika',
        lastName: 'Fuh',
        userName: 'annie',
        password: '12345',
        color: '#dddddd',
        eMail: 'a.fuh@blah.de'
      },
      {
        firstName: 'Anni',
        lastName: 'Fu',
        userName: 'annie',
        password: '12345',
        color: '#d11001',
        eMail: 'a.fuh@blah.de'
      },
      {
        firstName: 'Peter',
        lastName: 'Parker',
        userName: 'annie',
        password: '12345',
        color: '#06b6d4',
        eMail: 'a.fuh@blah.de'
      },
      {
        firstName: 'Alex',
        lastName: 'Ba',
        userName: 'Alex',
        password: '12345',
        color: '#404040',
        eMail: 'a.fuh@blah.de'
      },

    ];
    this.allUsers = users;
  }

  public getUsers(): Observable<User[]> {

    return of(this.allUsers);
  }

  public addUser(user: User): void {
      this.allUsers.push(user);
  }

  public editUser(user: User): void {}

  public deleteUser(user: User): void {}
}
