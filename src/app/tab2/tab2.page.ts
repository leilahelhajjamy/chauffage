import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  type;
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.type = localStorage.getItem('mode');
  }
}
