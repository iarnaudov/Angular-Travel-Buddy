import { Component, OnInit } from '@angular/core';
import { IDriverPost, IDriverPostCard } from 'src/app/common/interfaces';
import Utility from 'src/app/common/utilities';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  private viewPosts: IDriverPostCard[] = [];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const dbPosts: IDriverPostCard[] = Utility.firebaseSnapshotToArray(this.route.data['value'].posts.docs);
    console.log(dbPosts);
    this.viewPosts = dbPosts;

    setTimeout(() => {
      $(".postContainer").click((e) => this.redirectToPostEditPage(e));
    }, 200);
  }

  private redirectToPostEditPage(e) {
    const id: string = $(e.target).closest(".postContainer").attr("id");
    const postInfo: IDriverPostCard = this.viewPosts.filter((post: IDriverPostCard) => post.id === id)[0];
    this.router.navigate([`/post/driver/${id}`]);
  }

}
