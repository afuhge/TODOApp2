import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlHelperService {

  constructor() { }

  public static getBaseUrl(id: string): string{
    return `/${id}`;
  }

  public static getDashboardUrl(id: string): string {
    return ApiUrlHelperService.getBaseUrl(id) + '/dashboard';
  }

  public static getTODOsUrl(id: string): string {
    return ApiUrlHelperService.getBaseUrl(id) + '/todos';
  }

  public static getUsersUrl(id: string): string {
    return ApiUrlHelperService.getBaseUrl(id) + '/users';
  }

  public static getLoginUrl(id: string): string {
    return ApiUrlHelperService.getBaseUrl(id) + '/login';
  }
}
