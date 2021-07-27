import {Component, OnInit} from '@angular/core';

import {faInfoCircle, faPencilAlt, faSearch, faTrash, faUser, faUserPlus, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';
import {Title} from '@angular/platform-browser';
import {NotifcationService} from '../../services/notifcation.service';
import {ModalService} from '../../services/modal.service';
import {AddUserModalComponent} from '../../parts/add-user-modal/add-user-modal.component';
import {EditUserModalComponent} from '../../parts/edit-user-modal/edit-user-modal.component';
import {DeleteUserModalComponent} from '../../parts/delete-user-modal/delete-user-modal.component';
import {User} from '../../models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent{
  public users: User[] = [];
  public isLoading: boolean = true;
  public editIcon: IconDefinition = faPencilAlt;
  public deleteIcon: IconDefinition = faTrash;
  public addIcon: IconDefinition = faUserPlus;
  public searchIcon: IconDefinition = faSearch;
  public info: IconDefinition = faInfoCircle;
  constructor(
    private userService: UserService,
    private titleService: Title,
    private notifierService: NotifcationService,
    private modalService: ModalService,
  ) {
    this.userService.getUsers()
      .subscribe(users => {
        console.log('hi 2');
        console.log(users);
        this.users = users;
        this.isLoading = false;
      });

    this.titleService.setTitle('User Management');
  }




  editUser(user: User): void {
    const modal = this.modalService.showModal(EditUserModalComponent);
    modal.instance.user = user;
    // this.notifierService.success('User editted. Yay!');

  }

  deleteUser(user: User): void {
   const modal = this.modalService.showModal(DeleteUserModalComponent);
   modal.instance.user = user;
    // this.notifierService.error('You failed.sorry!');
  }

  public addUser(): void {
     this.modalService.showModal(AddUserModalComponent);
  }

  public searchUser(): void {

  }

}
