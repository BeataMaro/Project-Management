import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; //!!
import { RouterModule } from '@angular/router';
import { UserLoginRoutingModule } from './user-login-routing.module';
import { MaterialModule } from '../core/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginPageComponent } from './pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './pages/user-signup-page/user-signup-page.component';
import { UserEditPageComponent } from './pages/user-edit-page/user-edit-page.component';
import { CoreModule } from '../core/core.module';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { usersReducer } from './store/users/users.reducer';
import { UsersEffects } from './store/users/users.effects';

@NgModule({
  declarations: [
    UserLoginPageComponent,
    UserSignupPageComponent,
    UserEditPageComponent,
    UserInfoComponent,
  ],
  imports: [
    CoreModule,
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
