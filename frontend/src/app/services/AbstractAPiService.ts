import {HttpHeaders} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';

export abstract class AbstractAPiService {

  public readonly BASE_URL: string = 'http://localhost:3000';

  get httpOptions(): { headers?: HttpHeaders } {
    const token = this.localStorageService.getToken();
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    if (token) {
      headers = headers.append('Authorization', 'Bearer ' + token);
    }

    return {
      headers
    };
  }

  protected constructor(
    protected localStorageService: LocalStorageService,
  ) {
  }
}
