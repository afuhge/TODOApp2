import {Component} from '@angular/core';
import {ApiUrlHelperService} from '../../services/api-url-helper.service';
import {Router} from '@angular/router';
import {faChevronDown, faSignOutAlt, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public dashboardURL = '';
  public todoURL = '';
  public userURL = '';
  public landingURL = '';
  public logout: IconDefinition = faSignOutAlt;
public chevronDown: IconDefinition = faChevronDown;
public hidden = true;
public currentUser: User;
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
    this.dashboardURL = ApiUrlHelperService.getDashboardUrl('id');
    this.todoURL = ApiUrlHelperService.getTODOsUrl('id');
    this.userURL = ApiUrlHelperService.getUsersUrl('id');
    this.landingURL = ApiUrlHelperService.getLandingUrl('id');
    this.currentUser = localStorageService.getCurrentUser();
  }

  public signOut(): void {
    this.localStorageService.deleteUser();
    this.router.navigateByUrl(ApiUrlHelperService.getLoginUrl('id'));
  }

  public intToRGB(): string {
    const fullName = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    const current = this.hashCode(fullName);
    // tslint:disable-next-line:no-bitwise
    const c = (current & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return '#00000'.substring(0, 6 - c.length + 1) + c;
  }
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // tslint:disable-next-line:no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  public toggleDropDown(): void {
    this.hidden = ! this.hidden;
  }
}
