import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IErrorMessage, IRegisterModel } from "../../../common/interfaces";
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toaster } from 'src/app/common/toaster';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private toaster: Toaster = new Toaster();

  private error: IErrorMessage = {
    showError: false,
    errorMessage: ""
  };

  constructor(private authService: AuthService) { }

  public registerUser(registerForm: NgForm) {
    if (registerForm.invalid) {
      this.toaster.showError("Please fill the form correctly");
      console.log(registerForm.value);
      return;
    }

    this.authService.register(registerForm);
  }
}
