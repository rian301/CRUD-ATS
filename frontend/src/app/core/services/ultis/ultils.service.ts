import { Injectable } from '@angular/core';

import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class UltilsService {

constructor(public poNotification: PoNotificationService) { }

  errorMessage(message: string) {
    this.poNotification.error(message);
  }

  successMessage(message: string) {
    this.poNotification.success(message);
  }

}
