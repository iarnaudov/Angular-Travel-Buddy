import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public person = {
    name: "Ivo",
    age: 26,
  }
  constructor(private authService: AuthService) { }

  ngOnInit() {
    // console.log(this.authService.isLoggedIn());
    // this.authService.getAuthToken();
  }

}
