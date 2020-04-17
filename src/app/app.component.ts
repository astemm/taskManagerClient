import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Client';
  description = 'Tasks Manager App';
  private roles: string[];
  //private authority: string;
  private isLogged: boolean=false;

  constructor(private tokenStorage: TokenStorageService) { }
  
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLogged;
      /*
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } 
        //else if (role === 'ROLE_GUEST') {
        //  this.authority = 'guest';
        //  return false;
        //}
        this.authority = 'guest';
        return true;
      });
      */
    }
  }

}