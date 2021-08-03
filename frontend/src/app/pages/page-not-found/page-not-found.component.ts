import {Component, HostListener} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ApiUrlHelperService} from '../../services/api-url-helper.service';
import {faHome, IconDefinition} from '@fortawesome/free-solid-svg-icons';

interface DeviceInfo {
  browser: string;
  language: string;
  dimensions: {
    width: number,
    height: number,
  };
  href: string;
}

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  public deviceInfo: DeviceInfo;
  public home: IconDefinition = faHome;

  constructor(
    private titleService: Title,
    private router: Router,
  ) {
    this.titleService.setTitle('Page not found');
    const navigator = window.navigator;
    this.setUpDeviceInfo();
  }

  @HostListener('window:resize')
  private setUpDeviceInfo(): void {
    this.deviceInfo = {
      browser: navigator.userAgent,
      language: navigator.language,
      href: window.location.href,
      dimensions: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  public goToLandingPage(): void {
    this.router.navigateByUrl(ApiUrlHelperService.getLandingUrl());
  }
}
