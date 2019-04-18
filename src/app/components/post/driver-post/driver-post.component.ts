import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toaster } from "src/app/common/toaster";
import { IDriverPost } from "src/app/common/interfaces";
import { AuthService } from 'src/app/services/auth.service';
import Utility from 'src/app/common/utilities';
import { ActivatedRoute, Router } from '@angular/router';

declare var $;
declare var M;

@Component({
  selector: 'app-driver-post',
  templateUrl: './driver-post.component.html',
  styleUrls: ['./driver-post.component.scss']
})
export class DriverPostComponent implements OnInit {
  private toaster: Toaster = new Toaster();
  private cities = [];
  // @ts-ignore
  private dbPost: IDriverPost = {};
  private postIsInEditMode: boolean = false;
  private postId: string = "";

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cities = this.postService.getCities();
    if (this.route.data['value'].post) {
      this.dbPost = this.route.data['value'].post.data();
      this.postId = this.router.url.split("/")[3]
      this.postIsInEditMode = true;
    }
    //@ts-ignore
    $('#datepicker').datepicker({
      format: "dd/mm/yyyy",
      autoClose: true,
      showClearBtn: true,
      minDate: new Date(),
    });
    $('#timepicker').timepicker({ twelveHour: false, autoClose: true });
    $('.form-container select').select2();
    setTimeout(() => {
      $('.form-container select').select2()
      $(".fromToLabels").css("visibility", "visible");
    }, 10);
  }

  public driverCreatePost(postForm: NgForm) {
    let driverPost: IDriverPost = this.getFormInfo(postForm);
    if (this.formIsValid(driverPost)) {
      this.postService.addDriverPost(driverPost);
    } else {
      this.toaster.showError('Error', "Please fill the form correctly");
    }
  }

  private editPost(postForm: NgForm) {
    Swal.fire({
      title: "Запази промените?",
      type: "info",
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.value) {
        let driverPost: IDriverPost = this.getFormInfo(postForm);
        if (this.formIsValid(driverPost)) {
          this.toaster.showSuccess('Success', "Successfully edited");
          this.postService.editDriverPost(driverPost);
        } else {
          this.toaster.showError('Error', "Please fill the form correctly");
        }
      }
    })
  }

  private deletePost(postForm: NgForm) {
    Swal.fire({
      title: "Изтриване?",
      type: "info",
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.value) {
        this.postService.deleteDriverPost(this.postId);
      }
    })
  }

  private getFormInfo(postForm: NgForm) {
    var from = $("#fromCity").val() as string;
    var to = $("#toCity").val() as string;
    var date = Utility.dateToEpochTime($("#datepicker").val() as string);
    var time = $("#timepicker").val() as string;
    var price = postForm.controls.travelPrice.value as string;
    var seats = postForm.controls.freeSeats.value as string;
    let driverPost: IDriverPost = { id: this.postId, authorId: this.authService.getUserId(), from, to, date, time, price, seats }
    return driverPost;
  }


  private formIsValid(driverPost: IDriverPost) {
    var result = false;
    if (!!driverPost.from && !!driverPost.to && !!driverPost.date && !!driverPost.time && !!driverPost.price && driverPost.from !== driverPost.to && +driverPost.price < 1000 && +driverPost.seats <= 7) {
      result = true;
    }
    return result;
  }
}
