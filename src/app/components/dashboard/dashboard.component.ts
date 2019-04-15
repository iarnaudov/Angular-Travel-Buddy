import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Utility from 'src/app/common/utilities';
import { IDriverPostCard, IDriverPost } from 'src/app/common/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { forEach } from '@angular/router/src/utils/collection';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

declare var $;

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
      setTimeout(() => {
        $(".postContainer").click((e) => this.openPostModal(e));
      }, 200);

    });

    this.arrangeFields();
  }

  private arrangeFields() {
    Utility.initializeScrollBar(".cardsContainer");
    $('.form-margin-top select').select2();
    $('#datepicker').datepicker({
      format: "dd/mm/yyyy",
      autoClose: true,
      showClearBtn: true,
      minDate: new Date(),
    });

    const isInDriverDashboard = this.route.routeConfig.path.indexOf("driver") !== -1;
    if (!isInDriverDashboard) {
      $("#dashboardHeading").text("Хора, търсещи превоз");
    }

    $("#searchPosts").click(() => this.filterResults());
  }

  private openPostModal(e) {
    const id: string = $(e.target).closest(".postContainer").attr("id");
    const postInfo: IDriverPostCard = this.viewPosts.filter((post: IDriverPostCard) => post.id === id)[0];
    console.log(postInfo);
    const smokingIcon = postInfo.author.carSmoking === "true" ? "smoking_rooms" : "smoke_free";
    let htmlContent = `<div>
                        <div class="margin-bottom-sm bold-font modal-heading">Информация за шофьора</div>
                        <div class="row">
                          <div class="col s6">
                            <img src="${postInfo.author.profilePicture}" class="boder-radius" width="100" />
                          </div>
                          <div class="col s6">
                              <div class="margin-top-sm white-text">${postInfo.author.fullName}</div>
                              <div class="margin-top-sm white-text">${postInfo.author.mobile}</div>
                              <div class="margin-top-sm white-text">${postInfo.author.facebook}</div>
                          </div>
                        </div>
                        <div class="margin-bottom-sm bold-font modal-heading">Информация за пътуването</div>
                        <div class="row">
                          <div class="col s12">
                            <div class="margin-top-sm white-text">${postInfo.from} > ${postInfo.to}</div>
                            <div class="margin-top-sm white-text">${postInfo.time}, ${postInfo.date}</div>
                          </div>
                        </div>
                        <div class="margin-bottom-sm bold-font modal-heading">Информация за автомобила</div>
                        <div class="row">
                          <div class="col s12 l6">
                            <img src="${postInfo.author.carPicture}" class="boder-radius" width="180" />
                          </div>
                          <div class="col s12 l6">
                            <div class="row">
                              <div class="col s12 margin-top-sm white-text">${postInfo.author.carModel}</div>
                              <div class="col s12 margin-top-sm white-text">${postInfo.author.carRegNo}</div>
                              <div class="col s12 margin-top-sm white-text"><i class="small material-icons">${smokingIcon}</i></div>
                            </div>
                          </div>
                        </div>
                      </div>`

    Swal.fire({
      html: htmlContent
    })
  }

  private filterResults() {
    const fromCity = $("#fromCity").val() as string;
    const toCity = $("#toCity").val();
    const datePicker = $("#datepicker").val();

    this.viewPosts = this.initialPosts.filter((post) => {
      let condition: boolean = true;

      if (fromCity === "0" && toCity === "0" && datePicker === "") {
        return post;
      }

      if (fromCity !== "0") {
        condition = post.from === fromCity;
      }
      if (toCity !== "0") {
        condition = condition && post.to === toCity;
      }
      if (datePicker !== "") {
        condition = condition && post.date === datePicker;
      }

      return condition;;
    }
    );
  }

  private async mapViewModel(posts: IDriverPost[]) {
    const userInfoDict = await this.getUserInfos(posts);
    const viewModels: IDriverPostCard[] = posts.map((post: IDriverPost) => {
      const mapping: IDriverPostCard = {
        id: post.id,
        from: post.from,
        to: post.to,
        date: this.getDateFromEpoch(post.date),
        time: post.time,
        author: {
          id: userInfoDict[post.authorId].id,
          fullName: userInfoDict[post.authorId].username,
          facebook: userInfoDict[post.authorId].facebook,
          mobile: userInfoDict[post.authorId].mobile,
          profilePicture: userInfoDict[post.authorId].profilePicture,
          carModel: userInfoDict[post.authorId].carModel,
          carPicture: userInfoDict[post.authorId].carPicture,
          carRegNo: userInfoDict[post.authorId].carRegNo,
          carSmoking: userInfoDict[post.authorId].carSmoking,
        }
      }
      return mapping;
    })
    return viewModels;
  }

  private getDateFromEpoch(epochDateTime: number) {
    return new Date(epochDateTime).toLocaleDateString('en-GB');
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
