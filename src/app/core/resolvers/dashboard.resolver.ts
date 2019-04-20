import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { PostService } from '../../services/post.service';
import Utility from '../../common/utilities';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {
  constructor(private postService: PostService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const routePath = route.routeConfig.path;
    return this.postService.getPosts(routePath);
  }
}
