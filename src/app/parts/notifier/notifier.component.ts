import { Component, OnInit } from '@angular/core';
import {faTimes, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {NotifcationService, Notification} from '../../services/notifcation.service';
import {faCheckCircle, faTimesCircle} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent {
  public close: IconDefinition = faTimes;
  public notifications: Notification[] = [];
  public success: IconDefinition = faCheckCircle;
  public error: IconDefinition = faTimesCircle;


  constructor(
  private notificationService: NotifcationService,
  ) {

    this.notificationService.notification$.subscribe((notification: Notification) => {
      if (!notification){
        return;
      }
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== notification);
      }, 3000);
    });
  }


  public closeNotification(notification: Notification): void {

    if (!this.notifications.includes(notification)) { return; }

     // remove alert after faded out
    setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== notification);
      }, 300);

  }


}
