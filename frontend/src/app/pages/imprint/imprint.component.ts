import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html'
})
export class ImprintComponent implements OnInit {

  constructor(
    private titleService: Title,
  ) {
    this.titleService.setTitle('Imprint');
  }

  ngOnInit(): void {
  }

}
