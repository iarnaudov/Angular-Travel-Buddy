import { Injectable, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ILoginModel, IRegisterModel } from '../common/interfaces';
import Utility from 'src/app/common/utilities';
import Swal from "sweetalert2";
import { NgForm } from '@angular/forms';
import { Toaster } from "src/app/common/toaster";

declare var $: any;

@Injectable()

export class AuthService {
  private userAuth: any = {};
  private toaster: any = new Toaster();

  loggedInStatusUpdated: EventEmitter<string> = new EventEmitter();

  constructor(private firestore: AngularFirestore, private router: Router) { }

  public async register(registerForm: NgForm) {
    try {
      const newUser: IRegisterModel = registerForm.value;
      var response = await firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
      await this.firestore.collection("users").doc(response.user.uid).set({ username: newUser.username, isAdmin: false })
      Swal.fire("Success", "Successfully registered user", "success").then(() => {
        var userInfo: any = {};
        userInfo.id = response.user.uid;
        this.setLoggedIn(userInfo);
        this.router.navigate(["/"]);
      });
    } catch (error) {
      Swal.fire("Error occured", error.message, "error");
    }
  }

  public async login(loginForm: NgForm) {
    try {
      const loginCredentials: ILoginModel = loginForm.value;
      var auth = await firebase.auth().signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password);
      this.toaster.showSuccess("Good Good");
      this.userAuth.id = auth.user.uid;
      var userInfo = await this.getUserProfileInfo();
      userInfo.id = auth.user.uid;
      this.setLoggedIn(userInfo);
      this.router.navigate(["/"]);
    } catch (error) {
      Toast.fire({ title: 'Error', text: error.message, type: 'error' });
      loginForm.resetForm();
    }
  }

  public isLoggedIn(): boolean {
    return this.userAuth.id ? true : false;
  }

  public logOut() {
    firebase.auth().signOut();
    Toast.fire({ title: "Successfully logged out", type: 'success' });
    var userInfo: any = {};
    this.setLoggedIn(userInfo);
    this.router.navigate(["/"]);
  }

  public async updateUserProfile(profileForm: NgForm) {
    var form = profileForm.value;
    var userInfo: any = {
      id: this.userAuth.id,
      username: form.username,
      isAdmin: false,
      carModel: form.carModel,
      carPicture: form.carPicture,
      carRegNo: form.carRegNo,
      carSmoking: form.carSmoking,
      facebook: form.facebook,
      mobile: form.mobile,
      profilePicture: form.profilePicture,
    };

    await this.firestore.collection("users")
      .doc(this.userAuth.id)
      .set(userInfo);

    this.loggedInStatusUpdated.emit(userInfo);
  }

  public getUserProfileInfo() {
    let def = $.Deferred();
    this.firestore.collection("users")
      .doc(this.userAuth.id)
      .get()
      .subscribe((snapshot) => {
        def.resolve(snapshot.data());
      });

    return def.promise();
  }

  public getUserId() {
    return this.userAuth.id;
  }

  
  public isAdmin() {
    return this.userAuth.id;
  }

  private setLoggedIn(userInfo: any) {
    this.userAuth.id = userInfo.id;
    this.userAuth.username = userInfo.username;
    this.userAuth.profilePicture = userInfo.profilePicture;
    this.userAuth.username = userInfo.username;
    this.loggedInStatusUpdated.emit(this.userAuth);
  }
}
