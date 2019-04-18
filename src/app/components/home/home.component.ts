import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subscriber } from 'rxjs';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public person = {
    name: "Ivo",
    age: 26,
  }

  public input: number = 0;

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    // console.log(this.authService.isLoggedIn());
    // this.authService.getAuthToken();
    // this.wtf();
    // this.nice();
  }

  private nice() {
    this.postService.getPosts("driver").subscribe((values) => {
      console.log(values);
    })
  }

  private wtf() {
    var stream$ = new Observable((subscriber: Subscriber<number>) => {
      let counter = 0;
      setInterval(() => {
        subscriber.next(counter);
        counter++;
      }, 1000);
    });


    // stream$.subscribe({
    //   next: (value) => {
    //     this.input = value;
    //     console.log(this.input);
    //   }
    // })
    // stream$.subscribe((next) => {
    //   console.log(next);
    // });
  }

}
