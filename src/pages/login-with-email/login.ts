/* 
  Name - Login Component
  Functionality - For authentication of users using firebase.
  Author - Shantanu Kamdi
  Date - 06/06/2017
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Logger Service */
import { Logger } from '../../providers/logger';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginWithEmailPage {

  private loginForm: FormGroup;

  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _auth: AuthProvider,
              private _logger: Logger,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController
  ) {
    this.loginForm = formBuilder.group({
      emailId: [ '', Validators.compose([Validators.required])],
      password: [ '', Validators.required],
    });
  }
  /* Check for Network - Remaining*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  /* Navigate to Signup */
  navigateToSignup(){
    this._logger.log('navigateToSignup()');
    this.navCtrl.setRoot('SignUp');
  }

  /* Login Method */
  login(){
    this._logger.log('login()');
    let loginUserData = {
      emailId: this.loginForm.value.emailId,
      password: this.loginForm.value.password
    };

     /* Loader */
    let loader = this.loadingCtrl.create({
      content: 'Authenticating User'
    });

    loader.present();

    this._auth.authenticateAndLogin(loginUserData).then(authData => {
      console.log(authData);
      loader.dismiss();

      this.navCtrl.setRoot('HomePage');
    }, (error) => {
        console.log('Error is '+error);

        loader.dismiss();
        const alert = this.alertCtrl.create({
          title: 'ERROR',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  forgotPassword(){
    this.navCtrl.push('ForgetPasswordPage');
  }
}