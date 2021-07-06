import { Component, OnInit } from '@angular/core';
import {ApiUrlHelperService} from '../services/api-url-helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  public dashboardURL: string = '';
  public todoURL: string = '';
  public userURL: string = '';
  constructor(
    private router: Router,
  ) {
    this.dashboardURL = ApiUrlHelperService.getDashboardUrl('id');
    this.todoURL = ApiUrlHelperService.getTODOsUrl('id');
    this.userURL = ApiUrlHelperService.getUsersUrl('id');
  }



  public goToDashboard(): void {
    this.router.navigateByUrl(this.dashboardURL);
  }

  public goToTODOs(): void {
    this.router.navigateByUrl(this.todoURL);
  }

  public goToUsers(): void {
    this.router.navigateByUrl(this.userURL);
  }

  public goToLogin(): void {
    this.router.navigateByUrl(ApiUrlHelperService.getLoginUrl('id'));
  }

}
