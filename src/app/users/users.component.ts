import { Component, OnInit } from '@angular/core';

import {faPencilAlt, IconDefinition, faTrash} from '@fortawesome/free-solid-svg-icons';

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
  ) {
   /* this.userService.getUsers()
      .subscribe(users => {
        console.log(users);
        this.users = users;
      });
    */

    this.users = [
      {
        email: 'anni',
        color: '#abcdef',
        userName: 'anni',
        password: '12345',
        lastName: 'fuh',
        firstName: 'annie',
      },
      {
        email: 'anni',
        color: '#abcdef',
        userName: 'anni',
        password: 'abcdef',
        lastName: 'fuh',
        firstName: 'annie',
      },
      {
        email: 'anni',
        color: '#abcdef',
        userName: 'anni',
        password: '12345',
        lastName: 'fuh',
        firstName: 'annie',
      },
    ];
  }


  editUser(user: User): void {

  }

  deleteUser(user: User): void {}

  addUser(user: User): void {}
}
