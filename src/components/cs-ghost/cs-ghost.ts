import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GhostProvider } from "../../providers/ghost/ghost";

@Component({
  selector: 'cs-ghost',
  host: { '[class.isLoading]': 'isLoading' },
  template: `<ng-content *ngIf="!isLoading"></ng-content>`
})
export class CsGhostComponent {

  public isLoading: boolean = true;
  private isLoadingSubscription: Subscription;
  private data: Object = {};

  constructor(private _ghostPrv: GhostProvider) {
    this.isLoadingSubscription = this._ghostPrv.isLoading.subscribe(data => this._updateLoading(data));
  }

  public ngOnDestroy() {
    this.isLoadingSubscription.unsubscribe();
  }

  private _updateLoading(data) {
    if (!data) return
    this._setData(data)._process();
  }

  private _setData(data: Object) {
    this.data = data;
    return this;
  }

  private _process() {
    return this._setLoading();
  }


  private _setLoading() {
    this.isLoading = this.data['isLoading']
  }

}
