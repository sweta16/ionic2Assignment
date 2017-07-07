import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the ToastServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ToastServiceProvider {

  constructor(public http: Http,
              public toastCtrl: ToastController, ) {
    console.log('Hello ToastServiceProvider Provider');
  }

  toast(data)
  {
        let toast = this.toastCtrl.create({
          message: data,
          duration: 3000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
  }

}
