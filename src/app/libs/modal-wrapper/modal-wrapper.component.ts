import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent implements OnInit {

  @Input() header = 'Title';
  @Input() primaryText = 'Save';
  @Input() secondaryText?: string;
  @Input() headerClasses?: string;
  @Input() classes?: string;
  @Output() primaryAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() secondaryAction?: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
