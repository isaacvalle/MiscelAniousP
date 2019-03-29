import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class GhostProvider {

  constructor() {
    // console.log('Hello GhostProvider Provider');
  }

  private _isLoading = new BehaviorSubject<Object>(false);
  public isLoading = this._isLoading.asObservable();

  setLoading(isLoading: boolean) {
    this._isLoading.next({
      isLoading: isLoading
    })
  }

}
