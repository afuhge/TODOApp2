import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserData} from '../add-user-modal/add-user-modal.component';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {faExclamationCircle, faEye, faEyeSlash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  @Input() user: User;
  @ViewChild('password') password: ElementRef;
  public show = false;
  public eyeOpen: IconDefinition = faEye;
  public eyeClose: IconDefinition = faEyeSlash;
  public firstNameInvalid: boolean = false;
  public lastNameInvalid: boolean = false;
  public userNameInvalid: boolean = false;
  public mailInvalid: boolean = false;
  public passwordInvalid: boolean = false;
  public actionDisabled: boolean;
  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eMail: new FormControl('', [Validators.email, Validators.required]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    color: new FormControl(''),
  });
  public formData: UserData = new UserData();
  public error: IconDefinition = faExclamationCircle;
  @Output() edittedUser: EventEmitter<User> = new EventEmitter<User>();


  constructor(
    private modalService: ModalService,
    private userService: UserService,
  ) {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.formData = value as UserData;
        this.firstNameInvalid = (this.form.get('firstName').invalid && (this.form.get('firstName').dirty || this.form.get('firstName').touched));
        this.lastNameInvalid = (this.form.get('lastName').invalid && (this.form.get('lastName').dirty || this.form.get('lastName').touched));
        this.userNameInvalid = (this.form.get('userName').invalid && (this.form.get('userName').dirty || this.form.get('userName').touched));
        this.mailInvalid = (this.form.get('eMail').invalid && (this.form.get('eMail').dirty || this.form.get('eMail').touched));
        this.passwordInvalid = (this.form.get('password').invalid && (this.form.get('password').dirty || this.form.get('password').touched));
      });

    this.form.statusChanges
      .pipe(untilDestroyed(this))
      .subscribe((status) => {
        this.actionDisabled = status === 'INVALID';
      });

  }

  ngOnInit(): void {
    this.form.patchValue(this.user);
  }

  public editUser(): void {
    if (!this.actionDisabled) {
      const edittedUser: User = {
        id: this.user.id,
        ...this.form.value
      };
      this.userService.editUser(edittedUser)
        .pipe(untilDestroyed(this))
        .subscribe((user: User) => {
          this.edittedUser.emit(user);
        });
      this.modalService.closeModal();
    }
  }

  public closeModal(): void {
    if (this.form.dirty) {
      if (confirm('Are you sure you want to leave without saving?')) {
        this.modalService.closeModal();
      }
    } else {
      this.modalService.closeModal();
    }
  }

  public togglePassword(): void {
    this.show = !this.show;
    this.password.nativeElement.type = this.password.nativeElement.type === 'text' ? 'password' : 'text';
  }

}
