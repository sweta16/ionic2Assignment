import { Component } from '@angular/core';
import {  NavController, NavParams ,MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { CustomValidators } from '../../validators/custom-validation'
import { User } from '../../model/user';
import {UserServiceProvider} from '../../providers/user-service/user-service';
import { ToastServiceProvider } from '../../providers/toast-service/toast-service';
import { SecurityPage } from '../security/security';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  user = new User()
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public menuCtrl: MenuController, 
              public alertCtrl: AlertController,
              private userServiceProvider:UserServiceProvider,
              public toastServiceProvider: ToastServiceProvider,) {

                //define formbuilder
                this.loginForm = this.formBuilder.group({
                  userId: [this.user.userId, Validators.compose([Validators.required])],
                  password: [this.user.password, Validators.compose([Validators.required,CustomValidators.password])],
                });

                //Disable side menu on login screen
                this.menuCtrl.enable(false, 'authenticated');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goToForgotPassword(){
    let alert = this.alertCtrl.create({
      title: 'New Feature!',
      subTitle: 'Wait ... coming soon!',
      buttons: ['OK']
    });
    alert.present();
  }

  goToSignUp()
  {
   let alert = this.alertCtrl.create({
      title: 'New Feature!',
      subTitle: 'Wait ... coming soon!',
      buttons: ['OK']
    });
    alert.present(); 
  }
  //on form submit
  onSubmit(){
    var data ={
      userName:this.user.userId,
      password:this.user.password

    }
    //console.log(data)
    
    //without api
    var result = this.userServiceProvider.login(data)
    //console.log(result)
    if(result === 200)
    {
      this.navCtrl.setRoot(SecurityPage);
      this.toastServiceProvider.toast('successfully logged in')
    }
    else if(result === 400){
        this.toastServiceProvider.toast('UserName or password incoreect ! please try agains')
    }


  //for api function to be like this
  // this.userServiceProvider.loginWithApi(data).subscribe((result) => {

  //       if (result.statusCode === 200) {
  //           this.navCtrl.setRoot(SecurityPage);
  //           this.toastServiceProvider.toast('successfully logged in')
  //       }
  //       else{
  //       }
  //     }
  //     , (error) => {
  //          this.toastServiceProvider.toast('UserName or password incoreect ! please try agains')
  //     }
  //   );
   }

}
