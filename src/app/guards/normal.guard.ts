import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NormalGuard {

    constructor(private loginService: LoginService, private router: Router) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.loginService.isLoggedIn() && this.loginService.getUserRole()?.includes('NORMAL')) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }

}