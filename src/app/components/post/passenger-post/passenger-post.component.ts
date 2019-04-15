import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Toaster } from "src/app/common/toaster";
import { NgForm } from '@angular/forms';
import Utility from 'src/app/common/utilities';
import { IPassengerPost } from "src/app/common/interfaces";
import { AuthService } from 'src/app/services/auth.service';

declare var $;
declare var M;

@Component({
  selector: 'app-passenger-post',
  templateUrl: './passenger-post.component.html',
  styleUrls: ['./passenger-post.component.scss']
})
export class PassengerPostComponent implements OnInit {
  private toaster: Toaster = new Toaster();
  private cities = [];

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cities = this.postService.getCities();

    $('#datepicker').datepicker({
      format: "dd/mm/yyyy",
      autoClose: true,
      showClearBtn: true,
      minDate: new Date(),
    });
    $('#timepicker').timepicker({ twelveHour: false, autoClose: true });
    ($('.form-container select') as any).select2();
    setTimeout(() => {
      $('.form-container select').select2(),
        $(".fromToLabels").css("visibility", "visible");
    }, 10);
  }

  public passengerCreatePost(postForm: NgForm) {
    var from = $("#fromCity").val();
    var to = $("#toCity").val();
    var date = Utility.dateToEpochTime($("#datepicker").val());
    var time = $("#timepicker").val();

    if (this.formIsValid(from, to, date, time)) {
      let passengerPost: IPassengerPost = { authorId: this.authService.getUserId(), from, to, date, time }
      this.postService.addPassengerPost(passengerPost);
    } else {
      this.toaster.showError('Error', "Please fill the form correctly");
    }
  }

  private formIsValid(from: string, to: string, date: number, time: string) {
    var result = false;
    if (!!from && !!to && !!date && !!time && from !== to) {
      result = true;
    }
    return result;
  }

}
