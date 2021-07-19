import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  public editUser(): void {
    this.modalService.closeModal();
    console.log('edit user');
  }

  public closeModal(): void {
    this.modalService.closeModal();
    console.log('close modal');
  }

}
