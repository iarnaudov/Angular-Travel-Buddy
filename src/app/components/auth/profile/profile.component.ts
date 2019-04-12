import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toaster } from 'src/app/common/toaster';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private toaster: Toaster = new Toaster();

  @Input() formInfo: any = {};

  constructor(private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    const userInfo = this.route.data['value'].profileInfo;
    this.formInfo.username = userInfo.username;
    this.formInfo.profilePicture = userInfo.profilePicture;
    this.formInfo.mobile = userInfo.mobile;
    this.formInfo.facebook = userInfo.facebook;
    this.formInfo.carRegNo = userInfo.carRegNo;
    this.formInfo.carPicture = userInfo.carPicture;
    this.formInfo.carModel = userInfo.carModel;
    this.formInfo.carSmoking = userInfo.carSmoking;
  }

  async updateUserProfile(profileForm: NgForm) {
    console.log(profileForm.value);

    if (profileForm.invalid) {
      this.toaster.showModalError("Error Occurred");
    } else {
      await this.authService.updateUserProfile(profileForm);
      this.toaster.showModalSuccess("Error Occurred");
    }
  }
}
