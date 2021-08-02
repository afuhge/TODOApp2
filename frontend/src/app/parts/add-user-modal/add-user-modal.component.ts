import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {User} from '../../models/user';
import {faExclamationCircle, IconDefinition} from '@fortawesome/free-solid-svg-icons';


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
    color: new FormControl('#000000'),
  });
  public formData: UserData = new UserData();
  public error: IconDefinition = faExclamationCircle;
  public firstNameInvalid: boolean = false;
  public lastNameInvalid: boolean = false;
  public userNameInvalid: boolean = false;
  public mailInvalid: boolean = false;
  public passwordInvalid: boolean = false;
  public actionDisabled: boolean;

  @Output() createdUser: EventEmitter<User> = new EventEmitter<User>();
  constructor(
    private modalService: ModalService,
    private userService: UserService,
  ) {
    this.form.valueChanges.subscribe((value) => {
      this.formData =  value as UserData;
      this.firstNameInvalid = (this.form.get('firstName').invalid && (this.form.get('firstName').dirty || this.form.get('firstName').touched));
      this.lastNameInvalid = (this.form.get('lastName').invalid && (this.form.get('lastName').dirty || this.form.get('lastName').touched));
      this.userNameInvalid = (this.form.get('userName').invalid && (this.form.get('userName').dirty || this.form.get('userName').touched));
      this.mailInvalid = (this.form.get('eMail').invalid && (this.form.get('eMail').dirty || this.form.get('eMail').touched));
      this.passwordInvalid = (this.form.get('password').invalid && (this.form.get('password').dirty || this.form.get('password').touched));
    });

    this.form.statusChanges.subscribe((status) => {
      this.actionDisabled = status === 'INVALID';
    });

  }

  ngOnInit(): void {
    this.form.patchValue(this.formData);
  }

  public addUser(): void {
    if (!this.actionDisabled) {
      const newUser: User = {...this.form.value};
      this.userService.addUser(newUser)
        .subscribe((user: User) => {
          this.createdUser.emit(user);
        });
      this.modalService.closeModal();
    }
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

}
