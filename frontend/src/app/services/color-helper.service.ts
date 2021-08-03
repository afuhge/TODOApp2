import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ColorHelperService {

  constructor() { }

  public convertNameIntoColor(user: User): string {
    const fullName = `${user.firstName} ${user.lastName}`;
    const current = this.hashCode(fullName);
    // tslint:disable-next-line:no-bitwise
    const c = (current & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return '#00000'.substring(0, 6 - c.length + 1) + c;
  }
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // tslint:disable-next-line:no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
}
