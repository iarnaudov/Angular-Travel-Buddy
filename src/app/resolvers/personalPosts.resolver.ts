import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PostService } from '../services/post.service';
import Utility from '../common/utilities';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalPostsResolver implements Resolve<any> {
  constructor(private postService: PostService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const routePath = state.url;
    console.log(route);
    return this.postService.getPostsByAuthorId(this.authService.getUserId());
  }
}
