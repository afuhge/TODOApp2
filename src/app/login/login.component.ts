import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiUrlHelperService} from '../services/api-url-helper.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  public form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  constructor(
    private router: Router,
  ) {
    console.log(this.form.status);

    this.form.statusChanges.subscribe((status => {
      this.actionDisabled = status === 'INVALID';
    }));
  }

  private checkInputs(): boolean{
    if (this.form.get('username').value !== this.user.username || this.form.get('password').value !== this.user.password) {
      return false;
    }
    return true;
  }


  public signIn(): void {
    if (this.checkInputs()){
      this.loginSuccessful = true;
      this.router.navigateByUrl(ApiUrlHelperService.getDashboardUrl('id'));
    }
    this.loginSuccessful = false;
  }
}
