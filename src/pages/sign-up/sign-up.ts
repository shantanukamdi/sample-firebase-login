/* 
  Name - Signup Component
  Functionality - For registering of users using firebase.
  Author - Shantanu Kamdi
  Date - 07/06/2017
*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/* Forms module */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Logger Service */
import { Logger } from '../../providers/logger';
/* Auth Service */
import { AuthProvider } from '../../providers/auth';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUp {

  /* FormGroup which will be used in html */
  private form: FormGroup;
  /* For Validation purposes */
  private submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              private _logger: Logger,
              private _auth: AuthProvider
  ) {
    /* Creating form using formBuilder module and applying validations. Need to validate fields and make hash password */
    this.form = formBuilder.group({
        fullName: [ '', Validators.compose([Validators.required])],
        emailId: [''],
        phoneNumber: [ '', Validators.compose([Validators.required, Validators.maxLength(10)])],
        password: [ '', Validators.required],
        address: ['', Validators.required],
        attemptNo: ['', Validators.required],
        pincode: [ '', Validators.compose([Validators.required, Validators.maxLength(6)])],
        attemptDate: ['', Validators.required],
        dob: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUp');
  }

  /* Signup user method which is called in click */
  signupUser(){
    this._logger.log('signupUser() method');

    /* Creating user object using form values*/
    let userData = {
      fullName: this.form.value.fullName,
      emailId: this.form.value.emailId,
      phoneNumber: this.form.value.phoneNumber,
      password: this.form.value.password,
      address: this.form.value.address,
      attemptNo: this.form.value.attemptNo,
      pincode: this.form.value.pincode,
      attemptDate: this.form.value.attemptDate,
      dob: this.form.value.dob
    }
    /* Auth service registerUser method */
    this._auth.registerUser(userData);
  }

  /* Navigate back to login */
  navigateToLogin(){
    this._logger.log('navigateToLogin() method');
    this.navCtrl.push('Login');
  }
}










