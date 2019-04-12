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
  private cities = [];

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cities = this.postService.getCities();

    ($('select') as any).select2();
    $('#datepicker').datepicker({ format: "dd/mm/yyyy", autoClose: true });
    $('#timepicker').timepicker({ twelveHour: false, autoClose: true });
  }

  public passengerCreatePost(postForm: NgForm) {
    var from = $("#fromCity").val();
    var to = $("#toCity").val();
    var date = Utility.dateToEpochTime($("#datepicker").val());
    var time = $("#timepicker").val();

    if (this.formIsValid(from, to, date, time)) {
      let passengerPost: IPassengerPost = { passengerId: this.authService.getUserId(), from, to, date, time }
      this.postService.addPassengerPost(passengerPost);
    } else {
      Toast.fire({ title: 'Error', text: "Please fill the form correctly", type: 'error' });
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
