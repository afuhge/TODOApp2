import { Component, OnInit } from '@angular/core';

import {faPencilAlt, IconDefinition, faTrash} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';

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
  ) {
    this.userService.getUsers()
      .subscribe(users => {
        console.log(users);
        this.users = users;
      });
    
  }


  editUser(user: User): void {

  }

  deleteUser(user: User): void {}

  addUser(user: User): void {}
}
