import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { LoginInfo } from '../../models/login-info';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'Check username/password';
  errorMessage1 = 'net::ERR_CONNECTION_REFUSED';
  //roles: string[] = [];
  username:string;
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getAuthorities();
      this.username = this.tokenStorage.getUsername();
    }
  }

  onSubmit() {   //onSubmit(myForm: NgForm)
    console.log(this.form);
 
      this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);
 
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        //this.tokenStorage.saveAuthorities(data.authorities);
 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.text;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage() {
    window.location.href='/home';
  }

}
