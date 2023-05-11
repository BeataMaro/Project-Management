import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; //!!
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

import { UserLoginRoutingModule } from './user-login-routing.module';
import { MaterialModule } from '../core/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users-effects';
import { usersReducer } from './store/users-reducers';
import { UserEditPageComponent } from './pages/user-edit-page/user-edit-page.component';

// const routes: Routes = [
//   { path: '/login-form', component: UserLoginPageComponent },
//   { path: '/signup-form', component: UserSignupPageComponent },
// ];

@NgModule({
  declarations: [UserLoginPageComponent, UserSignupPageComponent, UserEditPageComponent],
  imports: [
    // RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserLoginRoutingModule,
    RouterModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
})
export class UserLoginModule {}
