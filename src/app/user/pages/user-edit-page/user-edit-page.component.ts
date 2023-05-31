import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../service/auth.service';
import { ConfirmationDialog } from '../../../core/components/confirmation-dialog/confirmation-dialog.component';
import { BoardsStateInterface } from '../../../store/reducers/board.reducers';
import { updateUser, deleteUser } from '../../../store/actions/users.actions';
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
    name: new FormControl(this.loggedUser.name, [
      Validators.required,
      Validators.minLength(3),
    ]),
    login: new FormControl(this.loggedUser.login, [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<BoardsStateInterface>,
    private dialog: MatDialog
  ) {
    this.isLoggedin = JSON.parse(localStorage.getItem('is_loggedin')!) || false;
  }

  ngOnInit() {
    !this.isLoggedin ? this.router.navigateByUrl('/home') : null;
    this.authService.getUser().subscribe((user) => {
      this.loggedUser = user;
    });
  }

  updateUser() {
    this.store.dispatch(updateUser({ user: this.editProfileForm.value }));
    this.ngOnInit();

    // Clear Edit Form
    this.editProfileForm.setValue({ name: '', login: '', password: '' });
  }
  deleteUser() {
    this.store.dispatch(deleteUser({ userId: this.loggedUser._id }));
    localStorage.clear();
    localStorage.setItem('is_loggedin', 'false');
    this.router.navigateByUrl('home');
  }

  submitDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: this.editProfileForm.valid
          ? 'Your account was successfully updated!'
          : 'Please fill in all the fields of the form',
        confirmButtonText: 'OK',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && this.editProfileForm.valid) {
        this.updateUser();
      }
    });
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        message: 'Are you sure you want to delete your account permanently?',
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
  }
}
