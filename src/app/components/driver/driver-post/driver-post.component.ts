import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Toaster } from "src/app/common/toaster";
import { IDriverPost } from "src/app/common/interfaces";
import { AuthService } from 'src/app/services/auth.service';
import Utility from 'src/app/common/utilities';

declare var $;
declare var M;

@Component({
  selector: 'app-driver-post',
  templateUrl: './driver-post.component.html',
  styleUrls: ['./driver-post.component.scss']
})
export class DriverPostComponent implements OnInit {
  private cities = [];

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.cities = this.postService.getCities();

    //@ts-ignore
    $('select').select2();
    $('#datepicker').datepicker({ format: "dd/mm/yyyy", autoClose: true });
    $('#timepicker').timepicker({ twelveHour: false, autoClose: true });
  }

  public driverCreatePost(postForm: NgForm) {
    var from = $("#fromCity").val() as string;
    var to = $("#toCity").val() as string;
    var date = Utility.dateToEpochTime($("#datepicker").val() as string);
    var time = $("#timepicker").val() as string;
    var price = $("#travelPrice").val() as string;
    var seats = $("#freeSeats").val() as string;

    if (this.formIsValid(from, to, date, time, price, seats)) {
      debugger;
      let driverPost: IDriverPost = { driverId: this.authService.getUserId(), from, to, date, time, price, seats }
      this.postService.addDriverPost(driverPost);
    } else {
      Toast.fire({ title: 'Error', text: "Please fill the form correctly", type: 'error' });
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
