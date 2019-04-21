import { Component, OnInit } from '@angular/core';
import { IDriverPost, IDriverPostCard } from 'src/app/common/interfaces';
import Utility from 'src/app/common/utilities';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  public viewPosts: IDriverPostCard[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const dbPosts: IDriverPostCard[] = Utility.firebaseSnapshotToArray(this.route.data['value'].posts.docs);
    this.viewPosts = dbPosts.filter((p) => {
      return p.authorId === this.authService.getUserId();
    });

    setTimeout(() => {
      $(".myPostContainer").click((e) => this.redirectToPostEditPage(e));
    }, 200);
  }

  private redirectToPostEditPage(e) {
    const id: string = $(e.target).closest(".myPostContainer").attr("id");
    const postInfo: IDriverPostCard = this.viewPosts.filter((post: IDriverPostCard) => post.id === id)[0];
    this.router.navigate([`/post/driver/${id}`]);
  }

}
