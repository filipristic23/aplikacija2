import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; 
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$:  Observable<firebase.User>;
  source = of(null);

  constructor( private userService:UserService, public afAuth:AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
    
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  get appUser() : Observable<AppUser>{
    return this.user$
    .pipe(switchMap(user =>{
      if(user) return this.userService.get(user.uid).valueChanges();

      return of(null);
    }));
  }

}
