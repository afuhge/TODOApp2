import { Component, OnInit } from '@angular/core';

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
export class PageNotFoundComponent  {
public deviceInfo: DeviceInfo;
  constructor() {
    const navigator = window.navigator;
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


}
