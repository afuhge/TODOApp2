import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eMail: new FormControl('', Validators.email),
    userName: new FormControl('', Validators.required),
    color: new FormControl(''),
  });
  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  public addUser(): void {
    console.log('Add user');
    this.modalService.closeModal();
  }

  public closeModal(): void {
    console.log('close modal');
    this.modalService.closeModal();
  }

}
