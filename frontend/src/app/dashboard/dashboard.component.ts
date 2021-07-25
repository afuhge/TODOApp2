import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Dashboard');
  }


}
