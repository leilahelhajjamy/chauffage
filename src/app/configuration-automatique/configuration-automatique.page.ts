import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { InfoService } from '../services/info.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-configuration-automatique',
  templateUrl: './configuration-automatique.page.html',
  styleUrls: ['./configuration-automatique.page.scss'],
})
export class ConfigurationAutomatiquePage implements OnInit {
  formConfigPriere;
  formConfig: FormGroup;
  possibilite = true;
  day;
  Qed;
  Td;
  Dn;
  Wn;
  Cn;
  Mode;
  now = -1 * new Date().getTime();
  heureEntree;
  User;
  Reservation = {
    Hu: '',
    Td: '',
    Dn: '',
    Wn: '',
    Cn: '',
    Qed: '',
  };
  constructor(
    private router: Router,
    private infoService: InfoService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    public authService: AuthService,
    private fireAuth: AngularFireAuth,
    private fdb: AngularFireDatabase
  ) {
    this.formConfig = this.formBuilder.group({
      Qed: new FormControl('', Validators.compose([Validators.required])),
      Td: new FormControl('', Validators.compose([Validators.required])),
      heureEntree: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  ngOnInit() {
    this.Mode = localStorage.getItem('mode');
    this.authService.getUserLoggedIin();
    setInterval(() => {
      this.dateAndTime();
    }, 1000);
  }

  dateAndTime() {
    this.day = this.infoService.dateAndTime().day;
    return this.infoService.dateAndTime().dateNowS;
  }

  getTempActuelle() {
    return this.infoService.getTempEauActuelle();
  }

  getTempAmbiante() {
    return this.infoService.getTempAmbiante();
  }

  getTempChauffe() {
    return this.infoService.getTempChauffe();
  }

  ConfirmQandT() {
    console.log('confirm clicked');
    if (this.heureEntree && this.Qed && this.Td && this.possibilite) {
      // calcul Wn
      this.Wn =
        Math.ceil((this.Dn / 60) * 500) > 1
          ? Math.ceil((this.Dn / 60) * 500)
          : 10;
      // calcul cout
      this.User = localStorage.getItem('uid');
      this.userService.saveConsommation(
        this.User,
        new Date(this.heureEntree).getTime(),
        this.Wn,
        this.Qed
      );
      this.infoService.toast('Douche réservée', 'top', 'success');
      this.Reservation = {
        Hu: new Date(this.heureEntree).getTime().toString(),
        Wn: this.Wn,
        Qed: this.Qed,
        Td: this.Td,
        Cn: this.Cn,
        Dn: this.Dn,
      };
      this.router.navigate(['/tab3'], {
        queryParams: this.Reservation,
      });
    } else if (this.heureEntree && this.Qed && this.Td && !this.possibilite) {
      this.infoService.toast(
        'Veuillez saisir une autre heure',
        'bottom',
        'warning'
      );
    } else {
      this.infoService.toast(
        'Veuillez remplir tous les champs',
        'top',
        'warning'
      );
    }
  }

  CalculDnPriere(Qed) {
    //A INTRODUIRE aussi dans settings
    if (Qed == 3) {
      this.Dn = 1;
    } else if (Qed == 5) {
      this.Dn = 2;
    }
  }

  faisabilite() {
    console.log('faisibilite running');
    this.CalculDnPriere(this.Qed);
    let minRequis = this.Dn * 60000 + new Date().getTime();
    let timeStampEntree = new Date(this.heureEntree).getTime();
    this.fdb
      .object('/reservations/')
      .query.orderByChild('timestamp')
      .startAt(timeStampEntree - 3600000)
      .endAt(timeStampEntree + 3600000)
      .on('value', (snapchot) => {
        snapchot.forEach((snap) => {
          this.possibilite = false;
          this.infoService.toast(
            'la douche est déja résérvée dans cette heure ',
            'top',
            'warning'
          );
        });
      });
    if (minRequis > timeStampEntree) {
      this.infoService.toast(
        "l'heure saisie n'est pas suffisante pour échauffer , Veuillez saisir une autre heure",
        'top',
        'warning'
      );
      this.possibilite = false;
    } else {
      this.possibilite = true;
    }
  }
}
