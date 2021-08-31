import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlHelperService {

  constructor() {
  }


  public static getDashboardUrl(): string {
    return '/dashboard';
  }

  public static getTODOsUrl(): string {
    return '/todos';
  }

  public static getUsersUrl(): string {
    return '/users';
  }

  public static getLoginUrl(): string {
    return '/login';
  }

  public static getLandingUrl(): string {
    return '/landing-page';
  }

  public static getSignUpUrl(): string {
    return '/register';
  }

  public static getPrivacy(): string {
    return '/privacy';
  }

  public static getImprint(): string {
    return '/imprint';
  }
}
