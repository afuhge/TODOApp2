import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../parts/add-user-modal/add-user-modal.component';
import { faExclamationCircle, faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiUrlHelperService } from '../../services/api-url-helper.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ColorHelperService } from '../../services/color-helper.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public actionDisabled = true;
  @ViewChild('password') password: ElementRef;
  public show = false;
  public eyeOpen: IconDefinition = faEye;
  public eyeClose: IconDefinition = faEyeSlash;
  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eMail: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    color: new FormControl('#000000'),
  });
  public formData: UserData = new UserData();
  public error: IconDefinition = faExclamationCircle;
  public firstNameInvalid = false;
  public lastNameInvalid = false;
  public userNameInvalid = false;
  public mailInvalid = false;
  public passwordInvalid = false;

  constructor(
    private titleService: Title,
    private router: Router,
    private userService: UserService,
    private colorService: ColorHelperService,
    private localStorageService: LocalStorageService,
  ) {
    this.titleService.setTitle('Register');

    this.form.valueChanges.subscribe((value) => {
      this.formData = value as UserData;
      this.firstNameInvalid = (
        this.form.get('firstName').invalid &&
        (
          this.form.get('firstName').dirty || this.form.get('firstName').touched
        )
      );
      this.lastNameInvalid = (
        this.form.get('lastName').invalid &&
        (
          this.form.get('lastName').dirty || this.form.get('lastName').touched
        )
      );
      this.userNameInvalid = (
        this.form.get('userName').invalid &&
        (
          this.form.get('userName').dirty || this.form.get('userName').touched
        )
      );
      this.mailInvalid = (
        this.form.get('eMail').invalid &&
        (
          this.form.get('eMail').dirty || this.form.get('eMail').touched
        )
      );
      this.passwordInvalid = (
        this.form.get('password').invalid &&
        (
          this.form.get('password').dirty || this.form.get('password').touched
        )
      );
    });

    this.form.statusChanges.subscribe((status) => {
      console.log(status);
      this.actionDisabled = status === 'INVALID';
    });
  }

  public signUp(): void {
    if (!this.actionDisabled) {
      const newUser: User = {
        ...this.form.value,
        todos: [],
        isAdmin: false,
      };
      newUser.color = this.colorService.convertNameIntoColor(newUser);
      console.log('hi');
      this.userService.addUser(newUser).subscribe((user: User) => {
        this.localStorageService.setCurrentUser(user);
        this.userService.currentUser.next(user);
        this.router.navigateByUrl(ApiUrlHelperService.getDashboardUrl());
      });
    }
  }

  public goToSignIn(): void {
    if (this.form.dirty) {
      if (confirm('Are you sure you want to leave this site?')) {
        this.router.navigateByUrl(ApiUrlHelperService.getLoginUrl());
      }
    }else {
      this.router.navigateByUrl(ApiUrlHelperService.getLoginUrl());
    }
  }

  public togglePassword(): void {
    this.show = !this.show;
    this.password.nativeElement.type = this.password.nativeElement.type === 'text' ? 'password' : 'text';
  }
}
