import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginMode: Boolean = true;
  email: string;
  password: string;
  error: false;


  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      this.email = form.value.email;
      this.password = form.value.password;
      this.login(this.email, this.password);
    }
 
  }

  login(email: string, password: string) {
    this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
    {
      email: this.email,
      password: this.password,
      returnSecureToken: true
    }).subscribe( {
        next: res => {
          console.log(res);
          this.router.navigate(['/projects']);
        },
        error: error => {
          this.error = error.error.error.message;
        }
      }
    )
  }

  onHandleError() {
    this.error = null;
  }
}


