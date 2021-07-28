import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../add-user-modal/add-user-modal.component';
import { UserService } from '../../services/user.service';
import {User} from '../../models/user';


@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  @Input() user: User;

  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eMail: new FormControl('',  [Validators.email, Validators.required]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    color: new FormControl(''),
  });
  public formData: UserData = new UserData();
  @Output() edittedUser: EventEmitter<User> = new EventEmitter<User>();


  constructor(
    private modalService: ModalService,
    private userService: UserService,
  ) {
    this.form.valueChanges.subscribe((value) => {
      this.formData = value as UserData;
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.user);
  }

  public editUser(): void {
    const edittedUser: User = {...this.form.value};
    this.userService.editUser(edittedUser)
      .subscribe((user: User) => {
        this.edittedUser.emit(user);
      });
    this.modalService.closeModal();
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

}
