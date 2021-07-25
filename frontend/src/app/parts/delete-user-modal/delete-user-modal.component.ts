import { Component, Input, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { User } from '../../users/users.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {
  @Input() user: User;

  constructor(
    private modalService: ModalService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
  }

  public deleteUser(): void {
    this.modalService.closeModal();
    this.userService.deleteUser(this.user);
    console.log('delete user');
  }

  public closeModal(): void {
    this.modalService.closeModal();
    console.log('close modal');
  }

}
