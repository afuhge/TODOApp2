import {Component} from '@angular/core';

import {faInfoCircle, faPencilAlt, faSearch, faTimesCircle, faTrash, faUserPlus, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../services/user.service';
import {Title} from '@angular/platform-browser';
import {NotifcationService} from '../../services/notifcation.service';
import {ModalService} from '../../services/modal.service';
import {AddUserModalComponent} from '../../parts/add-user-modal/add-user-modal.component';
import {EditUserModalComponent} from '../../parts/edit-user-modal/edit-user-modal.component';
import {DeleteUserModalComponent} from '../../parts/delete-user-modal/delete-user-modal.component';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent{
  public users: User[] = [];
  public filteredUsers: User[] = [];
  public editIcon: IconDefinition = faPencilAlt;
  public deleteIcon: IconDefinition = faTrash;
  public addIcon: IconDefinition = faUserPlus;
  public searchIcon: IconDefinition = faSearch;
  public info: IconDefinition = faInfoCircle;
  public resetIcon: IconDefinition = faTimesCircle;
  public users$: Observable<User[]>;

  public form: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private titleService: Title,
    private notifierService: NotifcationService,
    private modalService: ModalService,
  ) {
   this.users$ = this.userService.loadUser();
   this.users$.subscribe((el: User[]) => {
     this.users = el;
     this.filteredUsers = this.users;
   });


   this.titleService.setTitle('User Management');

   this.form.valueChanges.subscribe((value) => {
     this.searchUser();
   });
  }


  editUser(user: User): void {
    const modal = this.modalService.showModal(EditUserModalComponent);
    modal.instance.user = user;
    modal.instance.edittedUser.subscribe(
      (edittedUser: User) => {
          const index = this.users.findIndex((el: User) => el.id === edittedUser.id);
          if (index > -1) {
            this.users.splice(index, 1, edittedUser);
            this.notifierService.success('Edit user successful!');
          }
        },
      (err) => {
        this.notifierService.error('Edit user failed!');
      }
    );
  }

  deleteUser(user: User): void {
   const modal = this.modalService.showModal(DeleteUserModalComponent);
   modal.instance.user = user;
   modal.instance.deletedUser.subscribe(() => {
    const index = this.users.findIndex((el: User) => el.id === user.id);
    if (index > -1) {
      this.users.splice(index, 1);
      this.notifierService.success('Delete user successful!');
    }
   },
     (err) => {
       this.notifierService.error('Delete user failed!');
     });
  }

  public addUser(): void {
    const modal = this.modalService.showModal(AddUserModalComponent);
    modal.instance.createdUser.subscribe((user: User) => {
      this.users.push(user);
      this.notifierService.success('Add user successful!');

    },
      (err) => {
        this.notifierService.error('Add user failed!');
      });
  }

  public searchUser(): void {
    this.resetFilteredUsers();
    const searchTerm = this.form.get('searchTerm').value?.trim();
    if (searchTerm !== '') {
      this.filteredUsers = this.filteredUsers.filter((user: User) => {
        return user.userName.includes(searchTerm) ||
            user.firstName.includes(searchTerm) ||
            user.lastName.includes(searchTerm) ||
            user.eMail.includes(searchTerm);
      });
    }
  }

  public reset(): void {
    this.form.reset();
    this.resetFilteredUsers();
  }

  public resetFilteredUsers(): void {
    this.filteredUsers = this.users;
  }

}
