import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  public key = 'currentUser';

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
}
