import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: "root"} )
export class AuthService {

    // Define a behavior subject that other modules can subscribe to in order to know when 
    // there has been a change of login state.
    loggedIn = new BehaviorSubject<boolean>(null);
    isAdministrator = false;

    constructor( private router: Router, private http:HttpClient ) {}

    login(email: string, password: string) {
      return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      )
      .pipe(
          catchError( this.handleError ),
          tap ( res => {
              this.loggedIn.next(true);
              if (email === "guest@guest.com" )
                this.isAdministrator = false;
              else
                this.isAdministrator = true;
            }
          )
      );
      
      }

    handleError(errorDetails: HttpErrorResponse ) {
      let errorMessage = 'An unknown error occured';
      if (!errorDetails.error || !errorDetails.error.error) {
        // Do nothing
      }
      else {
        if (errorDetails.error.error.message = 'INVALID_LOGIN_CREDENTIALS') {
          errorMessage = 'These login credentials are invalid.'
        }
      }
      return throwError(() => {
        return errorMessage;
      });
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/']);
      }
}