import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';

@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:3000/users';  // URL to web api
  public allUsers: User[] = [];

  constructor(
    private http: HttpClient,
  ) {
  }

  public getUsers(): Observable<User[]> {
    const users = this.http.get<User[]>(this.usersUrl);
    users.subscribe((u: User[]) => {
      console.log('hi');
      this.allUsers = u;
    });
    console.log(this.allUsers);
    return of(this.allUsers);
  }

  public addUser(user: User): void {
      this.allUsers.push(user);
  }

  public editUser(user: User): void {}

  public deleteUser(user: User): void {}
}
