import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignupInfo } from '../../models/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignupInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  isAdmin: boolean = false;
  isGuest: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);
 
    this.signupInfo = new SignupInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );

           

  }

}

