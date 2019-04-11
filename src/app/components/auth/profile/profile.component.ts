import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() formInfo: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserProfileInfo().done((userInfo) => {
      this.formInfo.username = userInfo.username;
      this.formInfo.profilePicture = userInfo.profilePicture;
      this.formInfo.mobile = userInfo.mobile;
      this.formInfo.facebook = userInfo.facebook;
      this.formInfo.carRegNo = userInfo.carRegNo;
      this.formInfo.carPicture = userInfo.carPicture;
      this.formInfo.carModel = userInfo.carModel;
      this.formInfo.carSmoking = userInfo.carSmoking;
    });
  }

  async updateUserProfile(profileForm: NgForm) {
    console.log(profileForm.value);

    if (profileForm.invalid) {
      Swal.fire("Error Occurred", "", "error");
    } else {
      await this.authService.updateUserProfile(profileForm);
      Swal.fire("Success", "Updated profile info", "success");
    }

  }

}
