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
import {Observable} from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent{

  public users: User[] = [];
  public editIcon: IconDefinition = faPencilAlt;
  public deleteIcon: IconDefinition = faTrash;
  public addIcon: IconDefinition = faUserPlus;
  public searchIcon: IconDefinition = faSearch;
  public info: IconDefinition = faInfoCircle;
  public users$: Observable<User[]>;
  constructor(
    private userService: UserService,
    private titleService: Title,
    private notifierService: NotifcationService,
    private modalService: ModalService,
  ) {
   this.users$ = this.userService.loadUser();
   this.users$.subscribe((el: User[]) => {
     this.users = el;
   });


   this.titleService.setTitle('User Management');
  }




  editUser(user: User): void {
    const modal = this.modalService.showModal(EditUserModalComponent);
    modal.instance.user = user;
    modal.instance.edittedUser.subscribe((edittedUser: User) => {
      const index = this.users.findIndex((el: User) => el.id === edittedUser.id);
      if (index) {
        this.users.splice(index, 1, edittedUser);
        this.notifierService.success('Edit user successful!');
      }
    });

  }

  deleteUser(user: User): void {
   const modal = this.modalService.showModal(DeleteUserModalComponent);
   modal.instance.user = user;
   modal.instance.deletedUser.subscribe(() => {
    const index = this.users.findIndex((el: User) => el.id === user.id);
    if (index) {
      this.users.splice(index, 1);
      this.notifierService.success('Delete user successful!');
    }
   });
  }

  public addUser(): void {
    const modal = this.modalService.showModal(AddUserModalComponent);
    modal.instance.createdUser.subscribe((user: User) => {
      this.users.push(user);
      this.notifierService.success('Add user successful!');

    });
  }

  public searchUser(): void {

  }

}
