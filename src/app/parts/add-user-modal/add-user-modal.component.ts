import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {

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
