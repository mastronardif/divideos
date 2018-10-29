import {Injectable, NgZone} from "@angular/core";
import * as _ from "lodash";
//import {GoogleAuthService} from "../../../../ng-gapi/lib/GoogleAuthService";
//import {GoogleAuthService} from '../../../../node_modules/ng-gapi/lib/GoogleAuthService';
import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable()
export class UserService {
    public static readonly SESSION_STORAGE_KEY: string = "accessToken";
    public static readonly SESSION_STORAGE_USER: string = "accessUser";
    private user: GoogleUser = undefined;
    private userEmail: string = undefined;


    constructor(private googleAuthService: GoogleAuthService,
                private ngZone: NgZone) {
    }

    public setUser(user: GoogleUser): void {

        this.user = user;
    }

    // new begin
    public getCurrentUserEmail(): string {
        var str = sessionStorage.getItem(UserService.SESSION_STORAGE_USER);
        this.userEmail = str;
        return this.userEmail;
    }
    // new end

    public getCurrentUser(): GoogleUser {      
        return this.user;
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    }

    public signIn(cb) {
        this.googleAuthService.getAuth().subscribe((auth) => {
            auth.signIn().then(res => {this.signInSuccessHandler(res); cb()}, 
            err => this.signInErrorHandler(err));
        });
    }

    //TODO: Rework
    public signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            sessionStorage.removeItem(UserService.SESSION_STORAGE_KEY);
            sessionStorage.removeItem(UserService.SESSION_STORAGE_USER);
        });
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(sessionStorage.getItem(UserService.SESSION_STORAGE_KEY));
    }

    private signInSuccessHandler(res: GoogleUser) {
        this.ngZone.run(() => {
            // new begin
            this.user = res;
            // new end
            sessionStorage.setItem(
                UserService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );
            // new begin
            // sessionStorage.setItem(UserService.SESSION_STORAGE_USER, JSON.stringify(res));
            
            sessionStorage.setItem(UserService.SESSION_STORAGE_USER, res.getBasicProfile().getEmail());
            // new end

            console.log('\t FUCK user email= ', res.getBasicProfile().getEmail());
        });
    }

    private signInErrorHandler(err) {
        console.warn(err);
    }
}