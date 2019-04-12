import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/auth/login/login.component"
import { RegisterComponent } from "./components/auth/register/register.component"
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { AuthGuard } from "./guards/auth.guard";
import { ProfileComponent } from './components/auth/profile/profile.component';
import { DriverDashboardComponent } from './components/driver/driver-dashboard/driver-dashboard.component';
import { PassengerDashboardComponent } from './components/passenger/passenger-dashboard/passenger-dashboard.component';
import { DriverPostComponent } from './components/driver/driver-post/driver-post.component';
import { PassengerPostComponent } from './components/passenger/passenger-post/passenger-post.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "driver",
    children: [
      {
        path:  'post',
        component:  DriverPostComponent,
      },
      {
        path:  'dashboard',
        component:  DriverDashboardComponent,
        canActivate: [AuthGuard]
      },
    ],
   },
  { path: "passenger", 
    children: [
      {
        path:  'post',
        component:  PassengerPostComponent
      },
      {
        path:  'dashboard',
        component:  PassengerDashboardComponent,
        canActivate: [AuthGuard]
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
