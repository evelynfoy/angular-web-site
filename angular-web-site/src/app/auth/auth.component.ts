import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoggedIn: Boolean = false;
  email: string;
  password: string;
  error: false;

  constructor(  private router: Router, private authService: AuthService ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      this.email = form.value.email;
      this.password = form.value.password;
      this.authService.login(this.email, this.password).subscribe(
        {
          next: res => {
            this.router.navigate(['/projects']);
          },
          error: error => {
            this.error = error
          }
       })
    }
  }

  onHandleError() {
    this.error = null;
  }
}


