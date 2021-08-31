import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('void', style({opacity: 0})),
      transition('void => *', animate('300ms ease')),
    ])
  ]
})
export class ModalWrapperComponent implements OnInit {

  @Input() header = 'Title';
  @Input() primaryText = 'Save';
  @Input() secondaryText?: string;
  @Input() headerClasses?: string;
  @Input() classes?: string;
  @Input() actionDisabled?: boolean;
  @Output() primaryAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() secondaryAction?: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
