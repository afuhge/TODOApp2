import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserData} from '../../parts/add-user-modal/add-user-modal.component';
import {faExclamationCircle, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ApiUrlHelperService} from '../../services/api-url-helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
  public actionDisabled = true;
  public signUpSuccessful = true;

  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eMail: new FormControl('',  [Validators.email, Validators.required]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
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
  ) {
    this.titleService.setTitle('Register');

    this.form.valueChanges.subscribe((value) => {
      this.formData =  value as UserData;
      this.firstNameInvalid = (this.form.get('firstName').invalid && (this.form.get('firstName').dirty || this.form.get('firstName').touched));
      this.lastNameInvalid = (this.form.get('lastName').invalid && (this.form.get('lastName').dirty || this.form.get('lastName').touched));
      this.userNameInvalid = (this.form.get('userName').invalid && (this.form.get('userName').dirty || this.form.get('userName').touched));
      this.mailInvalid = (this.form.get('eMail').invalid && (this.form.get('eMail').dirty || this.form.get('eMail').touched));
      this.passwordInvalid = (this.form.get('password').invalid && (this.form.get('password').dirty || this.form.get('password').touched));
    });

    this.form.statusChanges.subscribe((status) => {
      console.log(status);
      this.actionDisabled = status === 'INVALID';
    });
  }


  public signUp(): void {
      this.router.navigateByUrl(ApiUrlHelperService.getDashboardUrl());
  }
}
