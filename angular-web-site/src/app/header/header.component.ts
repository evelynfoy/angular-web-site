import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMenuCollapsed = true;
  isLoggedIn = false;
  sub: Subscription;
  
  constructor( private authService: AuthService  ) { }

  ngOnInit(): void {

     this.sub = this.authService.loggedIn.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
     )

  }

  onLogout() {
    this.isMenuCollapsed = true;
    this.authService.logout();
  }

 ngOnDestroy(): void {
   this.sub.unsubscribe();
 }

}
