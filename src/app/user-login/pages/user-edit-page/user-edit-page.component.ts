import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../boards-listing/store/board/board-reducers';
import * as UsersActions from '../../store/users/users-actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iuser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss'],
})
export class UserEditPageComponent implements OnInit {
  passwordVisible = false;
  isLoggedin = false;
  loggedUser: Iuser = { _id: '', name: '', login: '', password: '' };


  editProfileForm = new FormGroup({
    name: new FormControl(this.loggedUser.name, [Validators.required]),
    login: new FormControl(this.loggedUser.login, [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.BoardsStateInterface>,
    private dialog: MatDialog
  ) {
    this.isLoggedin = JSON.parse(localStorage.getItem('is_loggedin')!) || false;
    this.authService.getUser().subscribe((user) => (this.loggedUser = user));
  }

  ngOnInit() {
    !this.isLoggedin ? this.router.navigateByUrl('/home') : null;
  }

  updateUser() {
    console.log(this.editProfileForm.value);
    // this.store.dispatch(
    //   UsersActions.updateUser({ user: this.editProfileForm.value })
    // );
    this.authService
      .updateUser(this.editProfileForm.value)
      .subscribe((res) => console.log(res));
  }
  deleteUser() {
    this.store.dispatch(
      UsersActions.deleteUser({ userId: this.loggedUser._id })
    );
    localStorage.clear();
    localStorage.setItem('is_loggedin', 'false');
    this.router.navigateByUrl('home');
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Do you want to delete your account?',
        cancelButtonText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteUser();
      }
    });
  }

  getAllUsers(): void {
    this.authService.getUsers().subscribe((res) => console.log(res));
    console.log(this.route.snapshot.data);
  }
}
