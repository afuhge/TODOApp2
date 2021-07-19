import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export class Notification {
  public title: string;
  public message: string;
  public isSuccess: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotifcationService {
  public notification$: BehaviorSubject<Notification> = new BehaviorSubject<Notification>(null);

  public success(message: string): void {
    const notification: Notification = {
      isSuccess: true,
      message,
      title: 'Success!'
    };
    this.notification$.next(notification);
  }

  public error(message: string): void {
    const notification: Notification = {
      isSuccess: false,
      message,
      title: 'Error!'
    };
    this.notification$.next(notification);
  }
}
