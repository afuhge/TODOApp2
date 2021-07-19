import {Component} from '@angular/core';

import {faPencilAlt, faSearch, faTrash, faUser, faUserPlus, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';
import {Title} from '@angular/platform-browser';
import {NotifcationService} from '../services/notifcation.service';
import {ModalService} from '../services/modal.service';
import {AddUserModalComponent} from '../parts/add-user-modal/add-user-modal.component';
import {EditUserModalComponent} from '../parts/edit-user-modal/edit-user-modal.component';
import {DeleteUserModalComponent} from '../parts/delete-user-modal/delete-user-modal.component';


export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public userName: string;
  public password: string;
  public color: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[] = [];
  public showAddModal: boolean = true;

  public editIcon: IconDefinition = faPencilAlt;
  public deleteIcon: IconDefinition = faTrash;
  public addIcon: IconDefinition = faUserPlus;
  public searchIcon: IconDefinition = faSearch;

  constructor(
    private userService: UserService,
    private titleService: Title,
    private notifierService: NotifcationService,
    private modalService: ModalService,
  ) {
    this.userService.getUsers()
      .subscribe(users => {
        console.log(users);
        this.users = users;
      });

    this.titleService.setTitle('User Management');
  }


  editUser(user: User): void {
    this.modalService.showModal(EditUserModalComponent);
    // this.notifierService.success('User editted. Yay!');

  }

  deleteUser(user: User): void {
    this.modalService.showModal(DeleteUserModalComponent);
    // this.notifierService.error('You failed.sorry!');
  }

  public addUser(): void {
     this.modalService.showModal(AddUserModalComponent);
  }

  public searchUser(): void {

  }
}
