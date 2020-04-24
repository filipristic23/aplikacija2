import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

 

  login(){
    this.auth.login();
  }
 

}
