// Modules
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule } from "@angular/forms";

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/layout/page-not-found/page-not-found.component';
import { PageSvgComponent } from './components/layout/page-svg/page-svg.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { DriverPostComponent } from './components/post/driver-post/driver-post.component';
import { PassengerPostComponent } from './components/post/passenger-post/passenger-post.component';
import { EpochToDateTimePipe } from './core/pipes/epochToDateTime.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PersonalComponent } from './components/post/personal/personal.component';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { BlockedUserPageComponent } from './components/layout/blocked-user-page/blocked-user-page.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { HighlightOnHoverDirective } from './core/directives/highlight-on-hover.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    PageSvgComponent,
    ProfileComponent,
    DriverPostComponent,
    PassengerPostComponent,
    EpochToDateTimePipe,
    DashboardComponent,
    PersonalComponent,
    UsersManagementComponent,
    BlockedUserPageComponent,
    HighlightOnHoverDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
