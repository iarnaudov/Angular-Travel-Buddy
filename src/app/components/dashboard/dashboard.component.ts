import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Utility from 'src/app/common/utilities';
import { IDriverPostCard, IDriverPost } from 'src/app/common/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { forEach } from '@angular/router/src/utils/collection';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private initialPosts: IDriverPostCard[] = [];
  private viewPosts: IDriverPostCard[] = [];
  private cities = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit() {

    this.cities = this.postService.getCities();
    const dbPosts: IDriverPost[] = Utility.firebaseSnapshotToArray(this.route.data['value'].posts.docs);
    this.mapViewModel(dbPosts).then((result: IDriverPostCard[]) => {
      this.viewPosts = result;
      this.initialPosts = result;
    });

    this.arrangeFields();
  }

  private arrangeFields() {
    Utility.initializeScrollBar(".cardsContainer");
    $('.form-margin-top select').select2();
    $('#datepicker').datepicker({ format: "dd/mm/yyyy", autoClose: true });

    const isInDriverDashboard = this.route._routerState.snapshot.url.indexOf("driver") !== -1;
    if (!isInDriverDashboard) {
      $("#dashboardHeading").text("Хора, търсещи превоз");
    }

    $("#searchPosts").click(() => {
      const fromCity = $("#fromCity").val() as string;
      const toCity = $("#toCity").val();
      const datePicker = $("#datepicker").val();
      this.viewPosts = this.initialPosts.filter(function (post) {
        return post.from === fromCity;
      }
      );
    });
  }

  private async mapViewModel(posts: IDriverPost[]) {
    const userInfoDict = await this.getUserInfos(posts);
    const viewModels: IDriverPostCard[] = posts.map((post: IDriverPost) => {
      const mapping: IDriverPostCard = {
        profilePicture: userInfoDict[post.authorId].profilePicture,
        driverFullName: userInfoDict[post.authorId].username,
        from: post.from,
        to: post.to,
        date: this.getDateFromEpoch(post.date),
        time: post.time,
      }
      return mapping;
    })
    return viewModels;
  }

  private getDateFromEpoch(epochDateTime: number) {
    return new Date(epochDateTime).toLocaleDateString('bg-BG');
  }

  private getTimeFromEpoch(epochDateTime: number) {
    return new Date(epochDateTime).toLocaleTimeString('bg-BG');
  }

  private async getUserInfos(dbPosts) {
    const userInfoDict = {};

    for (const post of dbPosts) {
      if (!userInfoDict[post.authorId]) {
        userInfoDict[post.authorId] = await this.authService.getUserProfileInfo(post.authorId);
      }
    }

    return userInfoDict;
  }

}
