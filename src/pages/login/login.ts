import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, ToastController,MenuController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { ListPage } from '../../pages/list/list'
import { HomePage} from '../../pages/home/home'
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading:any;
  data:any;
  private todo : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService:AuthServiceProvider,public loadingCtrl: LoadingController, private toastCtrl: ToastController,private formBuilder: FormBuilder,private menu: MenuController) {
    this.menu.enable(false);

    this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  doLogin() {
    this.showLoader();
    this.authService.login(this.todo.value).then((result) => {
      this.loading.dismiss();
      this.data = result;
      // localStorage.setItem('token', this.data.access_token);
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log(err);
      this.loading.dismiss();
      this.presentToast(err.error.error);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Authenticating...',
        cssClass:'loader',
        duration: 5000
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
