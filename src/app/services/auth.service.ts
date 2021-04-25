import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthguardService } from './authguard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  User;
  constructor(
    private fireAuth: AngularFireAuth,
    private authGuard: AuthguardService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async login(email, password) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user, 'logged in');
        localStorage.setItem('loggedIn', 'yes ');
        localStorage.setItem('uid', user.user.uid);
        this.authGuard.canActivate();
        if (this.authGuard.canActivate()) {
          this.router.navigate(['']);
        }
      })
      .catch(async (error) => {
        console.log(error.code);
        console.log(error.message);
        const alert = await this.alertController.create({
          cssClass: 'my-alert-class',
          message: error.message,
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
      });
  }

  forgotPassword(passwordResetEmail) {
    return this.fireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('loggedIn');
      this.authGuard.canActivate();
      console.log('loggedOut');
    });
  }

  getUserLoggedIin() {
    this.User = localStorage.getItem('uid');
  }
}
