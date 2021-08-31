import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiUrlHelperService} from '../../services/api-url-helper.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage.service';
import {faEye, faEyeSlash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private user = {
    username: 'annie',
    password: '12345',
  };
  // TODO

  @ViewChild('password') password: ElementRef;
  public actionDisabled = true;
  public loginSuccessful = true;
  public users: User[] = [];
  public users$: Observable<User[]>;
  public show = false;
  public eyeOpen: IconDefinition = faEye;
  public eyeClose: IconDefinition = faEyeSlash;

  public form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    private router: Router,
    private titleService: Title,
    private userService: UserService,
    private localStorageService: LocalStorageService,
  ) {

    this.titleService.setTitle('Login');
    this.form.statusChanges
      .pipe(untilDestroyed(this))
      .subscribe((status => {
        this.actionDisabled = status === 'INVALID';
      }));

    this.users$ = this.userService.loadUser();
    this.users$
      .pipe(untilDestroyed(this))
      .subscribe((el: User[]) => {
        this.users = el;
      });
  }

  private checkInputs(): boolean {
    if (this.form.get('username').value !== this.user.username || this.form.get('password').value !== this.user.password) {
      return false;
    }
    return true;
  }


  public signIn(): void {
    if (this.checkInputs()) {
      this.loginSuccessful = true;
      const userName: string = this.form.get('username').value;
      const user = this.findUserByUsername(userName);
      this.localStorageService.setCurrentUser(user);
      this.userService.currentUser.next(user);
      this.router.navigateByUrl(ApiUrlHelperService.getDashboardUrl());
    } else {
      this.loginSuccessful = false;
    }
  }

  private findUserByUsername(userName: string): User {
    return this.users.find((user: User) => user.userName === userName);
  }

  public goToSignUp(): void {
    if (this.form.dirty) {
      if (confirm('Are you sure you want to leave this site?')) {
        this.router.navigateByUrl(ApiUrlHelperService.getSignUpUrl());
      }
    } else {
      this.router.navigateByUrl(ApiUrlHelperService.getSignUpUrl());
    }
  }

  public togglePassword(): void {
    this.show = !this.show;
    this.password.nativeElement.type = this.password.nativeElement.type === 'text' ? 'password' : 'text';
  }
}
