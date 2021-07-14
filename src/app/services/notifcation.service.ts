import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

export class Notification {
  public title: string;
  public message: string;
  public isSuccess: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class NotifcationService {
  public notifications: Notification[] = [];
  constructor() {
    const test: Notification[] = [
      {
        title: 'Success!',
        message: 'YAY!',
        isSuccess: true,
      },
      {
        title: 'Failure!',
        message: 'oh no!',
        isSuccess: false,
      },
      {
        title: 'Success!',
        message: 'this is a great test wuhuuu',
        isSuccess: true,
      },
    ];
    this.notifications = test;
  }

  public addNotification(notification: Notification): void {
    this.notifications.push(notification);
  }

  public getNotifications(): Observable<Notification[]> {
    return of(this.notifications);
  }
}
