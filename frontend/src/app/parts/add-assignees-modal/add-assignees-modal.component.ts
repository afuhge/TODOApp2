import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {UserService} from '../../services/user.service';

import {User} from '../../models/user';
import {faCheckCircle, faInfoCircle, faSearch, faTimesCircle, faUserSlash, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {FormControl, FormGroup} from '@angular/forms';
import {faCircle} from '@fortawesome/free-regular-svg-icons';
import {Observable} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

class Assignee {
  public isSelected: boolean;
  public user: User;
}

@UntilDestroy()
@Component({
  selector: 'app-add-assignees-modal',
  templateUrl: './add-assignees-modal.component.html',
  styleUrls: ['./add-assignees-modal.component.css'],
})
export class AddAssigneesModalComponent {
  public users$: Observable<User[]> = new Observable<User[]>(null);
  public allUsers: User[] = [];
  public filteredUsers: Assignee[] = [];
  public info: IconDefinition = faInfoCircle;
  public resetIcon: IconDefinition = faTimesCircle;
  public userSlash: IconDefinition = faUserSlash;
  public search: IconDefinition = faSearch;
  public selectedUsers: Assignee[] = [];

  public circle: IconDefinition = faCircle;
  public check: IconDefinition = faCheckCircle;
  public changed: boolean = false;
  public isFiltered = false;

  @Output() assignees: EventEmitter<User[]> = new EventEmitter<User[]>();
  @Input() selectedAssignees: number[];

  public form: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });

  constructor(private modalService: ModalService, private userService: UserService) {
    this.users$ = this.userService.loadUser();
    this.users$
      .pipe(untilDestroyed(this))
      .subscribe((users: User[]) => {
        this.allUsers = users;
        this.selectedUsers = this.mapUsers();
        this.filteredUsers = this.selectedUsers;
      });

    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.searchUser();
      });

    this.form.get('searchTerm').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.isFiltered = value !== '';
      });
  }

  public mapUsers(): Assignee[] {
    return this.allUsers?.map((user: User) => {
      const assignee: Assignee = new Assignee();
      if (this.selectedAssignees.length) {
        assignee.isSelected = this.selectedAssignees.findIndex((userId) => userId === user.id) > -1;
      } else {
        assignee.isSelected = false;
      }
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
    this.isFiltered = false;
    this.resetFilteredUsers();
  }

  public resetFilteredUsers(): void {
    this.filteredUsers = this.selectedUsers;
  }

  closeModal(): void {
    if (this.changed) {
      if (confirm('Are you sure you want to leave without saving?')) {
        this.modalService.closeModal();
      }
    } else {
      this.modalService.closeModal();
    }
  }

  private searchUser(): void {
    this.resetFilteredUsers();
    const searchTerm = this.form.get('searchTerm').value?.trim();
    if (searchTerm !== '') {
      this.filteredUsers = this.filteredUsers.filter((user: Assignee) => {
        return user.user.firstName.includes(searchTerm) || user.user.lastName.includes(searchTerm);
      });
    }
  }

  public toggleSelected(user: Assignee): void {
    user.isSelected = !user.isSelected;
    this.changed = !this.changed;
  }

}
