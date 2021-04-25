import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  time;
  Reservation = {
    Hu: '',
    Td: '',
    Dn: '',
    Wn: '',
    Cn: '',
    Qed: '',
  };
  constructor(
    private route: ActivatedRoute,
    private infoService: InfoService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((res) => {
      this.Reservation.Hu = res.Hu;
      this.Reservation.Dn = res.Dn;
      this.Reservation.Td = res.Td;
      this.Reservation.Wn = res.Wn;
      this.Reservation.Cn = res.Cn;
      this.Reservation.Qed = res.Qed;
    });

    this.time = this.infoService.dateAndTimeReservation(
      this.Reservation.Hu
    ).timeS;
    this.time = this.time.split(':')[0] + ':' + this.time.split(':')[1];
  }
}
