import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare var $;
declare var M;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public auth: any = {
    isLoggedIn: false,
  };

  constructor(private authService: AuthService) {
    this.initializeSideNav();
    this.authService.loggedInStatusUpdated.subscribe((auth) => {
      this.auth.isLoggedIn = !!auth.id ? true : false;
      this.auth.profilePicture = auth.profilePicture || "https://www.mobelti.com.tr/wp-content/uploads/2017/11/man-avatar.png";
      this.auth.isAdmin = auth.isAdmin;
    })
  }

  private initializeSideNav() {
    document.addEventListener('DOMContentLoaded', function () {
      const sideBaroptions = {
        menuWidth: 200,
        closeOnClick: true,
        edge: 'right',
      }

      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, sideBaroptions);

      $('.sidenav li').click(() => {
        $('.sidenav').sidenav('close');
      })
    });
  }

  public logOut() {
    this.authService.logOut();
  }
}
