import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ApiUrlHelperService} from '../../services/api-url-helper.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../../services/local-storage.service';

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

  public actionDisabled: boolean = true;
  public loginSuccessful: boolean = true;
  public users: User[] = [];
  public users$: Observable<User[]>;

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
    console.log(this.form.status);
    this.titleService.setTitle('Login');
    this.form.statusChanges.subscribe((status => {
      this.actionDisabled = status === 'INVALID';
    }));

    this.users$ = this.userService.loadUser();
    this.users$.subscribe((el: User[]) => {
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
      this.router.navigateByUrl(ApiUrlHelperService.getDashboardUrl('id'));
    }
    this.loginSuccessful = false;
  }

  private findUserByUsername(userName: string): User {
    return this.users.find((user: User) => user.userName === userName);
  }
}
