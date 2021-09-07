import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {LocalStorageService} from './local-storage.service';
import {map, tap} from 'rxjs/operators';
import {AbstractAPiService} from './AbstractAPiService';

@Injectable()
export class UserService extends AbstractAPiService {

  private usersUrl = `${this.BASE_URL}/users`;  // URL to web api
  private currentUserUrl = `${this.usersUrl}/current`;
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    protected localStorageService: LocalStorageService,
  ) {
    super(localStorageService);
    this.currentUser$.next(this.localStorageService.getCurrentUser());
  }

  public loadUser(): Observable<User[]> {

    return this.http.get<User[]>(this.usersUrl, this.httpOptions)
      .pipe(
        map((res: any[]) => {
          return res.map((user) => User.fromJSON(user));
        }));
  }

  public getCurrentUser$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(this.currentUserUrl, this.httpOptions)
      .pipe(
        map((user: any) => {
          return User.fromJSON(user);
        }),
        tap(u => this.currentUser$.next(u)));
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(
        map((res: any) => {
          return User.fromJSON(res);
        }));
  }

  public editUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user, this.httpOptions)
      .pipe(
        map((res: any) => {
          return User.fromJSON(res);
        }));
  }

  public deleteUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete<User>(url, this.httpOptions);
  }
}
