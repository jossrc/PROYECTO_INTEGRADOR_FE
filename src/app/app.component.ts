import { Component } from '@angular/core';
import { NavigationService } from './service/navigation.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'postales';

  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {
    if (this.authService.getRole()) {
      this.navigationService.elegirMenuItems(authService.getRole()!);
    }
  }


}
