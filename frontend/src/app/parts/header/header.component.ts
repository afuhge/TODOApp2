import {Component} from '@angular/core';
import {ApiUrlHelperService} from '../../services/api-url-helper.service';
import {Router} from '@angular/router';
import {faChevronDown, faSignOutAlt, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ColorHelperService} from '../../services/color-helper.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FormControl, FormGroup} from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public dashboardURL = '';
  public todoURL = '';
  public userURL = '';
  public landingURL = '';
  public loginURL = '';
  public signUpURL = '';
  public logout: IconDefinition = faSignOutAlt;
  public chevronDown: IconDefinition = faChevronDown;
  public hidden = true;
  public currentUser: User;

  public form: FormGroup = new FormGroup({
    toggle: new FormControl(''),
  });

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private colorService: ColorHelperService,
  ) {
    this.dashboardURL = ApiUrlHelperService.getDashboardUrl();
    this.todoURL = ApiUrlHelperService.getTODOsUrl();
    this.userURL = ApiUrlHelperService.getUsersUrl();
    this.landingURL = ApiUrlHelperService.getLandingUrl();
    this.loginURL = ApiUrlHelperService.getLoginUrl();
    this.signUpURL = ApiUrlHelperService.getSignUpUrl();
    this.userService.getCurrentUser$()
      .pipe(untilDestroyed(this))
      .subscribe((user: User) => {
        this.currentUser = user;
      });

    this.form.valueChanges.subscribe((value) =>  {
      this.toggleTheme();
    });
  }

  public signOut(): void {
    this.localStorageService.deleteUser();
    this.userService.currentUser$.next(null);
    this.localStorageService.deleteToken();
    this.router.navigateByUrl(ApiUrlHelperService.getLandingUrl());
  }

  public intToRGB(): string {
    return this.colorService.convertNameIntoColor(this.currentUser);
  }

  public toggleDropDown(): void {
    this.hidden = !this.hidden;
  }

  public toggleTheme(): void {
    const html = document.querySelector('html');
    const text = document.getElementById('text');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        text.innerText = 'Light Theme';
      } else {
        html.classList.add('dark');
        text.innerText = 'Dark Theme';
      }
  }
}
