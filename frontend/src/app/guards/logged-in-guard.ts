import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ApiUrlHelperService} from '../services/api-url-helper.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {map} from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
  }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userService.currentUser.pipe(map((user: User) => {
      if (user) {
        return true;
      }
      return !!this.router.navigateByUrl(ApiUrlHelperService.getLandingUrl());
    }));
  }
}

