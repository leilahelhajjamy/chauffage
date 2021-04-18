import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('loggedIn')) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
}
