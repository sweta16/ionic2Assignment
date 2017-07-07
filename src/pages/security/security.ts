import { Component } from '@angular/core';
import {  NavController, NavParams,MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { HomePage } from '../home/home'
import { User } from '../../model/user';

/**
 * Generated class for the SecurityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-security',
  templateUrl: 'security.html',
})
export class SecurityPage {
  securityForm: FormGroup;
  user = new User()

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public menuCtrl: MenuController, 
              private userServiceProvider:UserServiceProvider,
              public toastServiceProvider: ToastServiceProvider,) {
              
                //define formbuilder
                this.securityForm = this.formBuilder.group({
                  birthDate: [this.user.birthDate, Validators.compose([Validators.required])],
                  phoneNumber: [this.user.phoneNumber, Validators.compose([Validators.required,Validators.maxLength(4)])],
                });

                //Disable side menu on security screen
                this.menuCtrl.enable(false);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecurityPage');
  }
  onSubmit(){
    var data = {
      birthDate:this.user.birthDate,
      phoneNumber:this.user.phoneNumber
    }
    console.log(data)
    let result= this.userServiceProvider.security(data)
    if(result === 200)
    {
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot(HomePage);
      this.toastServiceProvider.toast('Welcome User')
    }
    else if(result === 400){
        this.toastServiceProvider.toast('Incorrect seurity Questions!... please try again')
    }
  }

}
