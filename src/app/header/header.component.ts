import {Component} from '@angular/core';
import {ApiUrlHelperService} from '../services/api-url-helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public dashboardURL: string = '';
  public todoURL: string = '';
  public userURL: string = '';
  public landingURL: string = '';

  constructor(
    private router: Router,
  ) {
    this.dashboardURL = ApiUrlHelperService.getDashboardUrl('id');
    this.todoURL = ApiUrlHelperService.getTODOsUrl('id');
    this.userURL = ApiUrlHelperService.getUsersUrl('id');
    this.landingURL = ApiUrlHelperService.getLandingUrl('id');
  }

  public goToLogin(): void {
    this.router.navigateByUrl(ApiUrlHelperService.getLoginUrl('id'));
  }

}
