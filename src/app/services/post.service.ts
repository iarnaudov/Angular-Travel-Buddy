import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { IDriverPost, IPassengerPost } from "src/app/common/interfaces";
import { Toaster } from "src/app/common/toaster";
import Utility from 'src/app/common/utilities';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private toaster: Toaster = new Toaster();
  constructor(private firestore: AngularFirestore, private router: Router) { }

  public addDriverPost(post: IDriverPost) {
    this.firestore
      .collection("driverPosts")
      .add(post)
      .then(() => {
        this.toaster.showSuccess('Success', "Successfully added post");
        this.router.navigate(["/dashboard/driver"]);
      }).catch(() => {
        this.toaster.showError('Error', "Please fill the form correctly");
      })
  }

  public addPassengerPost(post: IPassengerPost) {
    this.firestore
      .collection("passengerPosts")
      .add(post)
      .then(() => {
        this.toaster.showSuccess('Success', "Successfully added post");
        this.router.navigate(["/dashboard/passenger"]);
      }).catch(() => {
        this.toaster.showError('Error', "Please fill the form correctly");
      })
  }

  public editDriverPost(post: IDriverPost) {
    this.firestore
      .collection("driverPosts")
      .doc(post.id)
      .update(post)
      .then(() => {
        this.toaster.showSuccess('Success', "Successfully edited post");
        this.router.navigate(["/post/personal"]);
      }).catch(() => {
        this.toaster.showError('Error', "Please fill the form correctly");
      })
  }

  public deleteDriverPost(postId: string) {
    this.firestore
      .collection("driverPosts")
      .doc(postId)
      .delete()
      .then(() => {
        this.toaster.showSuccess('Success', "Successfully deleted post");
        this.router.navigate(["/post/personal"]);
      }).catch(() => {
        this.toaster.showError('Error', "Please fill the form correctly");
      })
  }

  public getPosts(route: string) {
    const dbCollection = route.indexOf("driver") !== -1 ? "driverPosts" : "passengerPosts"
    return this.firestore.collection(dbCollection).get();
  }

  public getPost(route: string) {
    const dbCollection = route.indexOf("driver") !== -1 ? "driverPosts" : "passengerPosts"
    const postId = route.substring(route.lastIndexOf("/") + 1);
    return this.firestore.collection(dbCollection).doc(postId).get();
  }

  public getPostsByAuthorId(authorId: string) {
    return this.firestore.collection("driverPosts").get();
  }

  public getCities() {
    return [
      "Айтос",
      "Асеновград",
      "Ахтопол",
      "Балчик",
      "Банкя",
      "Банско",
      "Батак",
      "Белене",
      "Белица",
      "Белослав",
      "Берковица",
      "Битоля",
      "Благоевград",
      "Ботевград",
      "Брацигово",
      "Брезник",
      "Бургас",
      "Бяла",
      "Варна",
      "Велес",
      "Велики Преслав",
      "Велико Търново",
      "Велинград",
      "Видин",
      "Враца",
      "Вършец",
      "Габрово",
      "Гевгели",
      "Горна Оряховица",
      "Гоце Делчев",
      "Гюмюрджина",
      "Дедеагач",
      "Демир Хисар",
      "Димитровград",
      "Добрич",
      "Дойран",
      "Долна Баня",
      "Долна Оряховица",
      "Долни Дъбник",
      "Драма",
      "Дупница",
      "Елена",
      "Исперих",
      "Ихтиман",
      "Кавала",
      "Каварна",
      "Казанлък",
      "Калофер",
      "Карлово",
      "Карнобат",
      "Кешан",
      "Китен",
      "Козлодуй",
      "Копривщица",
      "Костенец",
      "Костур",
      "Котел",
      "Кресна",
      "Крушево",
      "Ксанти",
      "Кукуш",
      "Кърджали",
      "Кюстендил",
      "Лерин",
      "Ловеч",
      "Лозенград",
      "Лом",
      "Люле Бургас",
      "Мадан",
      "Мелник",
      "Момчилград",
      "Монтана",
      "Несебър",
      "Никопол",
      "Ниш",
      "Нова Загора",
      "Обзор",
      "Одрин",
      "Оряхово",
      "Охрид",
      "Павликени",
      "Пазарджик",
      "Панагюрище",
      "Перник",
      "Перущица",
      "Петрич",
      "Пещера",
      "Пирдоп",
      "Плевен",
      "Пловдив",
      "Поморие",
      "Попово",
      "Пордим",
      "Правец",
      "Прилеп",
      "Приморско",
      "Провадия",
      "Първомай",
      "Радомир",
      "Разград",
      "Разлог",
      "Русе",
      "Самоков",
      "Сандански",
      "Свиленград",
      "Свищов",
      "Своге",
      "Севлиево",
      "Серес",
      "Силистра",
      "Симеоновград",
      "Скопие",
      "Сливен",
      "Смолян",
      "Созопол",
      "Солун",
      "Сопот",
      "София",
      "Стара Загора",
      "Стражица",
      "Струга",
      "Струмица",
      "Тетово",
      "Тополовград",
      "Троян",
      "Трън",
      "Тулча",
      "Тутракан",
      "Търговище",
      "Харманли",
      "Хасково",
      "Хисар",
      "Царево",
      "Цариброд",
      "Цариград",
      "Чаталджа",
      "Чепеларе",
      "Червен бряг",
      "Чирпан",
      "Чорлу",
      "Шумен",
      "Щип",
      "Якоруда",
      "Ямбол",
    ]
  }
}
