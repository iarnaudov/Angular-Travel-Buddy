import { Component, OnInit, Input } from '@angular/core';
import { IErrorMessage, ILoginModel } from 'src/app/common/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toaster } from "src/app/common/toaster";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  public loginUser(loginForm: NgForm) {
    if (loginForm.invalid) {
      Toaster.fire({ title: 'Error', text: "Please fill the form correctly", type: 'error' });
      return;
    }
    this.authService.login(loginForm);
  }
}
