import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {ApiUrlHelperService} from '../services/api-url-helper.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userService.currentUser$.pipe(map((user: User) => {
      if (!user) {
        return true;
      }
      return !!this.router.navigateByUrl(ApiUrlHelperService.getDashboardUrl());
    }));
  }
}
