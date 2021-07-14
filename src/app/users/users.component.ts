import { Component, OnInit } from '@angular/core';

import {faPencilAlt, IconDefinition, faTrash} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';
import {Title} from '@angular/platform-browser';
import {NotifcationService, Notification} from '../services/notifcation.service';

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

  public editIcon: IconDefinition = faPencilAlt;
  public  deleteIcon: IconDefinition = faTrash;

  constructor(
    private userService: UserService,
    private titleService: Title,
    private notifierService: NotifcationService,
  ) {
    this.userService.getUsers()
      .subscribe(users => {
        console.log(users);
        this.users = users;
      });

    this.titleService.setTitle('User Management');
  }


  editUser(user: User): void {
    console.log('hie');
    const notification: Notification = {
      isSuccess: true,
      message: 'User editted yay',
      title: 'success',
    };
    console.log(notification);
    this.notifierService.addNotification(notification);

  }

  deleteUser(user: User): void {}

  addUser(user: User): void {}
}
