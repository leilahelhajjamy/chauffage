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
import { AuthService } from 'src/app/services/auth.service';
import { AuthguardService } from 'src/app/services/authguard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formRegister: FormGroup;
  email: string;
  password: string;
  confirmpassword: string;
  constructor(
    public authGuard: AuthguardService,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    private fireAuth: AngularFireAuth,
    public navCtrl: NavController,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.formRegister = this.formBuilder.group({
      password: new FormControl('', Validators.compose([Validators.required])),
      confirmpassword: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      email: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {}
  registerUser() {
    this.userService.registerUser(this.email, this.password);
    this.navCtrl.navigateForward('');
  }
}
