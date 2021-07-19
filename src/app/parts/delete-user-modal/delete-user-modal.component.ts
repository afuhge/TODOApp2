import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent implements OnInit {

  constructor(
    private modalService: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  public deleteUser(): void {
    this.modalService.closeModal();
    console.log('delete user');
  }

  public closeModal(): void {
    this.modalService.closeModal();
    console.log('close modal');
  }

}
