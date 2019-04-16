import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/auth/login/login.component"
import { RegisterComponent } from "./components/auth/register/register.component"
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { AuthGuard } from "./guards/auth.guard";
import { ProfileComponent } from './components/auth/profile/profile.component';
import { DriverPostComponent } from './components/post/driver-post/driver-post.component';
import { PassengerPostComponent } from './components/post/passenger-post/passenger-post.component';
import { ProfileResolver } from './resolvers/profile.resolver';
import { UserGuard } from './guards/user.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardResolver } from './resolvers/dashboard.resolver';
import { PersonalComponent } from './components/post/personal/personal.component';
import { PostResolver } from './resolvers/post.resolver';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent, canActivate: [UserGuard] },
  { path: "register", component: RegisterComponent, canActivate: [UserGuard] },
  { path: "profile", component: ProfileComponent, resolve: { profileInfo: ProfileResolver }, canActivate: [AuthGuard] },
  {
    path: "dashboard",
    children: [
      {
        path: 'driver',
        component: DashboardComponent,
        // canActivate: [AuthGuard],
        resolve: { posts: DashboardResolver }
      },
      {
        path: 'passenger',
        component: DashboardComponent,
        // canActivate: [AuthGuard],
        resolve: { posts: DashboardResolver }
      },
    ],
  },
  {
    path: "post",
    children: [
      {
        path: 'passenger',
        component: PassengerPostComponent
      },
      {
        path: 'passenger/:id',
        component: PassengerPostComponent,
        resolve: { post: PostResolver }
      },
      {
        path: 'driver',
        component: DriverPostComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: 'driver/:id',
        component: DriverPostComponent,
        // canActivate: [AuthGuard],
        resolve: { post: PostResolver }
      },
      {
        path: 'personal',
        component: PersonalComponent,
        // canActivate: [AuthGuard]
      },
    ],
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
