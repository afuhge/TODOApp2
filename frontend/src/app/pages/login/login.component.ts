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
import {AuthenticationService} from '../../services/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('password') password: ElementRef;
  public actionDisabled = true;
  public loginSuccessful = true;
  public users: User[] = [];
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
    private authenticationService: AuthenticationService,
  ) {

    this.titleService.setTitle('Login');
    this.form.statusChanges
      .pipe(untilDestroyed(this))
      .subscribe((status => {
        this.actionDisabled = status === 'INVALID';
      }));
  }



  public signIn(): void {
      this.authenticationService.loginUser(this.form.value)
        .subscribe((token: string) => {
            this.localStorageService.setToken(token);

            this.loginSuccessful = true;
            this.userService.fetchCurrentUser().subscribe((user: User) => {
              this.localStorageService.setCurrentUser(user);

              this.router.navigateByUrl(ApiUrlHelperService.getDashboardUrl());
            });
        }, (err) => {
          console.log(err);
          this.loginSuccessful = false;
        });
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
