import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toaster } from "src/app/common/toaster";
import { IDriverPost } from "src/app/common/interfaces";
import { AuthService } from 'src/app/services/auth.service';
import Utility from 'src/app/common/utilities';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cities = this.postService.getCities();
    let dbPosts: IDriverPost;
    if (this.route.data['value'].post) {
      dbPosts = this.route.data['value'].post.data();
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
    var from = $("#fromCity").val() as string;
    var to = $("#toCity").val() as string;
    var date = Utility.dateToEpochTime($("#datepicker").val() as string);
    var time = $("#timepicker").val() as string;
    var price = $("#travelPrice").val() as string;
    var seats = $("#freeSeats").val() as string;

    if (this.formIsValid(from, to, date, time, price, seats)) {
      let driverPost: IDriverPost = { authorId: this.authService.getUserId(), from, to, date, time, price, seats }
      this.postService.addDriverPost(driverPost);
    } else {
      this.toaster.showError('Error', "Please fill the form correctly");
    }
  }


  private formIsValid(from: string, to: string, date: number, time: string, price: string, seats: string) {
    var result = false;
    if (!!from && !!to && !!date && !!time && !!price && from !== to && +price < 1000 && +seats <= 7) {
      result = true;
    }
    return result;
  }
}
