import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  public readonly isMobileSub$ = new BehaviorSubject<boolean>(false);
  public readonly screenWidthSub$ = new BehaviorSubject<number>(1200);

constructor() { }

}
