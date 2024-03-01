import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root"} )
export class AuthService {

    // Define a behavior subject that other modules can subscribe to in order to know when 
    // there has been a change of login state.
    loggedIn = new BehaviorSubject<boolean>(null);

}