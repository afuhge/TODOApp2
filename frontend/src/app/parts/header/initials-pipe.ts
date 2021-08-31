import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../models/user';

@Pipe({
  name: 'initials',
})
export class InitialsPipe implements PipeTransform {
  transform(currentUser: User): string {
    return `${currentUser.firstName.substring(0, 1)} ${currentUser.lastName.substring(0, 1)}`;
  }

}
