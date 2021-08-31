import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
  @Input() user: User;
  @Output() deletedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private modalService: ModalService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  public deleteUser(): void {
    this.userService.deleteUser(this.user)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.deletedUser.emit(this.user);
      });
    this.modalService.closeModal();
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

}
