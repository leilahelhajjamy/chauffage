import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  day;
  constructor(private navCtrl: NavController, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.dateAndTime();
    }, 1000);
  }

  dateAndTime() {
    var dateNow = new Date();
    var dateNowS = dateNow
      .toString()
      .replace('GMT+0200', '')
      .replace('(heure d’été d’Europe centrale)', '')
      .replace('(heure normale d’Europe centrale)', '');
    this.day =
      dateNowS.split(' ')[1] +
      ' ' +
      dateNowS.split(' ')[2] +
      ' ' +
      dateNowS.split(' ')[3];
    dateNowS = dateNowS.split(' ')[4];
    return dateNowS;
  }

  ConfigurationChoixEco() {
    var eco = 'economique';
    localStorage.setItem('mode', eco);

    this.navCtrl.navigateForward('tab2');
  }
  ConfigurationChoixCon() {
    var conf = 'confort';
    localStorage.setItem('mode', conf);
    this.navCtrl.navigateForward('tab2');
  }
  ConfigurationChoixConfP() {
    var confP = 'confortPlus';
    localStorage.setItem('mode', confP);
    this.navCtrl.navigateForward('tab2');
  }
}
