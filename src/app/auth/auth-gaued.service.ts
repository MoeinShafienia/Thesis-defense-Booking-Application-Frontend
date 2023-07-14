import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {}

  canActivate(): boolean {
    // Add your logic to check if the user is logged in
    const userToken = localStorage.getItem('jwtToken');
    let isLoggedIn = !!userToken;

    if(userToken){
      const isExpired = this.jwtHelper.isTokenExpired(userToken);
      if(isExpired)
        isLoggedIn = false;
    }

    if (!isLoggedIn) {
        
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
  
}
