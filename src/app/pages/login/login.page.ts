import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NavController, NavParams, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthguardService } from 'src/app/services/authguard.service';
import { AuthService } from 'src/app/services/auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin: FormGroup;
  email: string;
  password: string;

  constructor(
    public authGuard: AuthguardService,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    public navCtrl: NavController,
    private authService: AuthService
  ) {
    this.formLogin = this.formBuilder.group({
      password: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {}

  registerPage() {
    this.navCtrl.navigateForward('register');
  }

  login() {
    this.authService.login(this.email, this.password);
  }

  async forgotPassword() {
    this.authService.forgotPassword(this.email);
    if (this.email != null) {
      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        message:
          '<div class="alert-wrapper">Un message de réinitialisation est envoyé, rendez-vous sur votre boîte </div>',
        buttons: [
          {
            cssClass: 'my-button-alert',
            text: 'Ok',
            handler: () => {
              console.log('ok clicked');
            },
          },
        ],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-alert-class',
        message:
          '<div class="alert-wrapper"> Veuillez saisir votre adresse email </div>',
        buttons: [
          {
            cssClass: 'my-button-alert',
            text: 'Ok',
            handler: () => {
              console.log('ok clicked');
            },
          },
        ],
      });
      await alert.present();
    }
  }
}
