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
  private isLogged: boolean=false;

  constructor(private tokenStorage: TokenStorageService) { }
  
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLogged=true;
    }
  }

}