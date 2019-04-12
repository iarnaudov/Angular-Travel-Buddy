import { Component, OnInit, Input } from '@angular/core';
import { IErrorMessage, ILoginModel } from 'src/app/common/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Toaster } from "src/app/common/toaster";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private toaster: Toaster = new Toaster();

  constructor(private authService: AuthService) { }

  public loginUser(loginForm: NgForm) {
    if (loginForm.invalid) {
      this.toaster.showModalError('Error', "Please fill the form correctly");
      return;
    }
    this.authService.login(loginForm);
  }
}
