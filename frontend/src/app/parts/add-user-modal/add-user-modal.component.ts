import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../users/users.component';

export class UserData {
  public firstName: string;
  public lastName: string;
  public eMail: string;
  public userName: string;
  public color: string;
  public password: string;
}
@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eMail: new FormControl('',  [Validators.email, Validators.required]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    color: new FormControl('#fff'),
  });
  public formData: UserData = new UserData();
  constructor(
    private modalService: ModalService,
    private userService: UserService,
  ) {
    this.form.valueChanges.subscribe((value) => {
      this.formData =  value as UserData;
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.formData);
  }

  public addUser(): void {
    console.log('Add user');
    const newUser: User = {...this.form.value};
    this.userService.addUser(newUser);
    this.userService.getUsers().subscribe((value) => {
      console.log(value);
    });
    this.modalService.closeModal();
  }

  public closeModal(): void {
    console.log('close modal');
    this.modalService.closeModal();
  }

}
