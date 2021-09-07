import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  public key = 'currentUser';
  public token = 'token';

  public setCurrentUser(user: User): void {
    const currentUser: string = JSON.stringify(user);
    localStorage.setItem(this.key, currentUser);
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.key));
  }

  public deleteUser(): void {
    localStorage.removeItem(this.key);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }

  public getToken(): string {
    return localStorage.getItem(this.token);
  }

  public deleteToken(): void {
    localStorage.removeItem(this.token);
  }
}
