import { Component, OnInit } from '@angular/core';
import {faTimes, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {NotifcationService, Notification} from '../../services/notifcation.service';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {
  public close: IconDefinition = faTimes;
  public notifications: Notification[] = [];

  constructor(
  private notificationService: NotifcationService,
  ) {

    this.notificationService.getNotifications().subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }

  ngOnInit(): void {

    this.notifications.forEach((not) => {
      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== not);
      }, 3000);
    });

  }

  public closeNotification(notification: Notification): void {

    if (!this.notifications.includes(notification)) { return; }

     // remove alert after faded out
    setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== notification);
      }, 250);

  }


}
