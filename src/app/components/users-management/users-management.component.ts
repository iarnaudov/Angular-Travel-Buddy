import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Utility from 'src/app/common/utilities';
import { IUserManagement } from 'src/app/common/interfaces';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  public usersArray: IUserManagement[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    const users: IUserManagement[] = Utility.firebaseSnapshotToArray(this.route.data['value'].users.docs);
    this.usersArray = users.filter((user) => user.isAdmin === false);
    console.log(users);
  }

  private blockUser(userId: string, blockResult: boolean) {
    const title = blockResult ? "Блокиране на потребителя?" : "Отблокиране на потребителя?";
    Swal.fire({
      title,
      type: "info",
      showCancelButton: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.value) {
        this.usersArray.filter((user) => user.id === userId)[0].isBlocked = blockResult;
        this.authService.blockUser(userId, blockResult);
        console.log("blocked " + userId);
      }
    })
  }
}
