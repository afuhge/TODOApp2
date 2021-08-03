import {Component, EventEmitter, Output} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {UserService} from '../../services/user.service';

import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {faCheckCircle, faInfoCircle, faTimesCircle, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup} from '@angular/forms';
import {faCircle} from '@fortawesome/free-regular-svg-icons';


class Assignee {
  public isSelected: boolean;
  public user: User;
}
@Component({
  selector: 'app-add-assignees-modal',
  templateUrl: './add-assignees-modal.component.html',
  styleUrls: ['./add-assignees-modal.component.css']
})
export class AddAssigneesModalComponent {
public users$: Observable<User[]> = new Observable<User[]>(null);
public users: User[] = [];
  public filteredUsers: User[] = [];
  public info: IconDefinition = faInfoCircle;
  public resetIcon: IconDefinition = faTimesCircle;
  public selectedUsers: Assignee[] = [];

  public circle: IconDefinition = faCircle;
  public check: IconDefinition = faCheckCircle;

@Output() assignees: EventEmitter<User[]> = new EventEmitter<User[]>();
  public form: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });


  constructor(
    private modalService: ModalService,
    private userService: UserService,
  ) {
    this.users$ = this.userService.loadUser();
    this.users$.subscribe((users: User[]) => {
      this.users = users;
      // todo: eigentlich selectedUsers filtern
      this.filteredUsers = users;
      this.selectedUsers = this.mapUsers();
    });

    this.form.valueChanges.subscribe((value) => {
      this.searchUser();
    });
  }

  public mapUsers(): Assignee[] {
    return this.users.map((user: User) => {
      const assignee: Assignee = new Assignee();
      assignee.isSelected = false;
      assignee.user = user;
      return assignee;
    });
  }

  public addAssignee(): void {
      const selectedUsers = this.selectedUsers
        .filter((assignee: Assignee) => assignee.isSelected)
        .map((assignee: Assignee) => assignee.user);
      this.assignees.emit(selectedUsers);
      this.modalService.closeModal();
  }

  public reset(): void {
    this.form.reset();
    this.resetFilteredUsers();
  }

  public resetFilteredUsers(): void {
    this.filteredUsers = this.users;
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  private searchUser(): void {
    this.resetFilteredUsers();
  }

  public toggleSelected(user: Assignee): void {
    user.isSelected = ! user.isSelected;
  }
}
